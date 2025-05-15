import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Login setAuth={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('handles user input correctly', () => {
    render(
      <MemoryRouter>
        <Login setAuth={jest.fn()} />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('successful login stores token and redirects', async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: 'fake-jwt-token' },
    });

    axios.get.mockResolvedValueOnce({
      data: { isManager: true },
    });

    const setAuthMock = jest.fn();
    render(
      <MemoryRouter>
        <Login setAuth={setAuthMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'manager@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('authToken', 'fake-jwt-token', {
        expires: 7,
      });
      expect(setAuthMock).toHaveBeenCalledWith(true);
    });
  });

  test('failed login displays error message', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid login credentials' } },
    });

    render(
      <MemoryRouter>
        <Login setAuth={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid login credentials/i)
      ).toBeInTheDocument();
    });
  });
});
