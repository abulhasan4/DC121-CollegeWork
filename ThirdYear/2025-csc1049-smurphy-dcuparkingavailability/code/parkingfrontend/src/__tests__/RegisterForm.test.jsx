import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../components/Register";
import axios from "axios";
import { MemoryRouter } from "react-router-dom"; 
import Cookies from "js-cookie";

jest.mock("axios");
jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

describe("RegisterForm Component", () => {
  test("renders form fields correctly", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vehicle Registration Number:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  test("updates form fields on user input", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    const firstNameInput = screen.getByLabelText(/First Name:/i);
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");
  });

  test("shows error when passwords do not match", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password:/i), {
      target: { value: "password321" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() =>
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
    );
  });

  test("successful registration stores token and redirects", async () => {
    axios.post.mockResolvedValue({
      data: { token: "fake-jwt-token" },
    });

    const { container } = render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password:/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("authToken", "fake-jwt-token", {
        expires: 7,
      });
    });

    expect(screen.getByText(/User registered successfully!/i)).toBeInTheDocument();
  });

  test("handles API errors gracefully", async () => {
    axios.post.mockRejectedValue({
      response: { data: ["User already exists."] },
    });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password:/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() =>
      expect(screen.getByText(/User already exists/i)).toBeInTheDocument()
    );
  });
});
