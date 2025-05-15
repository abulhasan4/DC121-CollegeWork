/*
ANTI-PLAGIARISM POLICY

[Abul Hasan Sheik Madhar Ali]
[22390436]

I declare that this material, which I now submit for assessment, is entirely my own work and has not been taken from the work of others save and to the extent that such work has been cited and acknowledged within the text of my work.
*/

#include "utility.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/types.h>
#include <dirent.h>

// Function to display the shell prompt
void display_prompt() {
    char cwd[MAX_PATH_LENGTH];
    if (getcwd(cwd, sizeof(cwd)) != NULL) {
        printf("%s$ ", cwd); // Print current directory followed by a prompt
    } else {
        perror("getcwd() error"); // Print an error message if getting the current directory fails
    }
}

// Function to read a command from user input
int read_command(char *input) {
    printf("myshell> "); // Print a prompt indicating the shell is ready to accept input
    return fgets(input, MAX_COMMAND_LENGTH, stdin) != NULL; // Read input from stdin and return 1 if successful, 0 otherwise
}

// Function to tokenize the input command
int tokenize(char *input, char *tokens[]) {
    int count = 0;
    char *token = strtok(input, " \t\n"); // Tokenize input string using space, tab, and newline as delimiters
    while (token != NULL && count < MAX_TOKENS - 1) {
        tokens[count++] = token; // Store each token in the tokens array
        token = strtok(NULL, " \t\n");
    }
    tokens[count] = NULL; // Add NULL terminator to indicate the end of tokens
    return count; // Return the number of tokens
}

// Function to execute commands in batch mode
void batch_mode(const char *batchfile) {
    FILE *file = fopen(batchfile, "r"); // Open the batch file for reading
    if (file == NULL) {
        perror("Error opening file"); // Print an error message if opening the file fails
        exit(EXIT_FAILURE); // Exit the program with failure status
    }

    char input[MAX_COMMAND_LENGTH];
    char *tokens[MAX_TOKENS];
    int num_tokens;

    while (fgets(input, MAX_COMMAND_LENGTH, file) != NULL) { // Read each line from the batch file
        num_tokens = tokenize(input, tokens); // Tokenize the input line
        if (!handle_builtin_commands(num_tokens, tokens)) { // Check if it's a built-in command
            int background = 0;
            if (num_tokens > 0 && strcmp(tokens[num_tokens - 1], "&") == 0) {
                background = 1; // Set background flag if the command ends with "&"
                tokens[num_tokens - 1] = NULL; // Remove the "&" token
            }
            execute_command(tokens, background); // Execute the command
        }
    }

    fclose(file); // Close the batch file
}

// Function to handle built-in commands
int handle_builtin_commands(int num_tokens, char *tokens[]) {
    if (num_tokens == 0) {
        return 1; // Return 1 if no tokens are present
    }

    if (strcmp(tokens[0], "cd") == 0) {
        handle_cd(num_tokens, tokens); // Handle "cd" command
        return 1;
    }

    if (strcmp(tokens[0], "clr") == 0) {
        handle_clr(); // Handle "clr" command
        return 1;
    }

    if (strcmp(tokens[0], "dir") == 0) {
        handle_dir(num_tokens, tokens); // Handle "dir" command
        return 1;
    }

    if (strcmp(tokens[0], "environ") == 0) {
        handle_environ(); // Handle "environ" command
        return 1;
    }

    if (strcmp(tokens[0], "echo") == 0) {
        handle_echo(num_tokens, tokens); // Handle "echo" command
        return 1;
    }

    if (strcmp(tokens[0], "help") == 0) {
        handle_help(); // Handle "help" command
        return 1;
    }

    if (strcmp(tokens[0], "pause") == 0) {
        handle_pause(); // Handle "pause" command
        return 1;
    }

    if (strcmp(tokens[0], "quit") == 0) {
        handle_quit(); // Handle "quit" command
        return 1;
    }

    return 0; // Return 0 if the command is not a built-in command
}

// Function to execute commands
void execute_command(char *tokens[], int background) {
    int in_fd = 0;  // Default stdin
    int out_fd = 1; // Default stdout

    // Check for input and output redirection
    for (int i = 0; tokens[i] != NULL; i++) {
        if (strcmp(tokens[i], "<") == 0) {
            // Handle input redirection
            in_fd = open(tokens[i + 1], O_RDONLY);
            if (in_fd == -1) {
                perror("open() failed"); // Print an error message if opening the file fails
                exit(EXIT_FAILURE); // Exit the program with failure status
            }
            tokens[i] = NULL; // Remove "<" and the filename from the tokens array
            tokens[i + 1] = NULL;
            break;
        } else if (strcmp(tokens[i], ">") == 0) {
            // Handle output redirection (truncate)
            out_fd = open(tokens[i + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
            if (out_fd == -1) {
                perror("open() failed"); // Print an error message if opening the file fails
                exit(EXIT_FAILURE); // Exit the program with failure status
            }
            tokens[i] = NULL; // Remove ">" and the filename from the tokens array
            tokens[i + 1] = NULL;
            break;
        } else if (strcmp(tokens[i], ">>") == 0) {
            // Handle output redirection (append)
            out_fd = open(tokens[i + 1], O_WRONLY | O_CREAT | O_APPEND, 0644);
            if (out_fd == -1) {
                perror("open() failed"); // Print an error message if opening the file fails
                exit(EXIT_FAILURE); // Exit the program with failure status
            }
            tokens[i] = NULL; // Remove ">>" and the filename from the tokens array
            tokens[i + 1] = NULL;
            break;
        }
    }

    pid_t pid = fork(); // Fork a new process

    if (pid == -1) {
        perror("fork() failed"); // Print an error message if forking fails
        exit(EXIT_FAILURE); // Exit the program with failure status
    } else if (pid == 0) { // Child process
        // Redirect stdin
        if (in_fd != 0) {
            dup2(in_fd, 0);
            close(in_fd);
        }
        // Redirect stdout
        if (out_fd != 1) {
            dup2(out_fd, 1);
            close(out_fd);
        }
        execvp(tokens[0], tokens); // Execute the command
        perror("execvp() failed"); // Print an error message if execution fails
        exit(EXIT_FAILURE); // Exit the child process with failure status
    } else { // Parent process
        if (!background) {
            int status;
            waitpid(pid, &status, 0); // Wait for the child process to finish
        }
    }
}

// Function to handle "cd" command
void handle_cd(int num_tokens, char *tokens[]) {
    if (num_tokens == 1 || chdir(tokens[1]) == -1) {
        perror("cd failed"); // Print an error message if changing directory fails
    }
}

// Function to handle "clr" command
void handle_clr() {
    printf("\033[H\033[J"); // Clear the screen
}

// Function to handle "dir" command
void handle_dir(int num_tokens, char *tokens[]) {
    if (num_tokens == 1) {
        system("ls -al"); // List directory contents using system call
    } else {
        execvp(tokens[0], tokens); // Execute command with arguments
        perror("execvp() failed"); // Print an error message if execution fails
        exit(EXIT_FAILURE); // Exit the program with failure status
    }
}

// Function to handle "environ" command
void handle_environ() {
    extern char **environ;
    int i;
    for (i = 0; environ[i] != NULL; i++) {
        printf("%s\n", environ[i]); // Print environment variables
    }
}

// Function to handle "echo" command
void handle_echo(int num_tokens, char *tokens[]) {
    for (int i = 1; i < num_tokens; i++) {
        printf("%s ", tokens[i]); // Print arguments
    }
    printf("\n");
}

// Function to display help message
void handle_help() {
    printf("This is a simple shell.\n");
    printf("Commands:\n");
    printf("  cd <directory>    Change current directory\n");
    printf("  clr               Clear the screen\n");
    printf("  dir [options]     List directory contents\n");
    printf("  environ           List all environment variables\n");
    printf("  echo <args>       Display arguments\n");
    printf("  help              Display this help message\n");
    printf("  pause             Pause the shell until Enter is pressed\n");
    printf("  quit              Exit the shell\n");
}

// Function to pause shell operation
void handle_pause() {
    printf("Press Enter to continue...");
    while (getchar() != '\n'); // Wait for Enter key press
}

// Function to quit the shell
void handle_quit() {
    printf("Exiting shell.\n");
    exit(EXIT_SUCCESS); // Exit the program with success status
}
