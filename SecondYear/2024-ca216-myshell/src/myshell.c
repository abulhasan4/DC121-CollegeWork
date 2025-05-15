/*
ANTI-PLAGIARISM POLICY

[Abul Hasan Sheik Madhar Ali]
[22390436]

I declare that this material, which I now submit for assessment, is entirely my own work and has not been taken from the work of others save and to the extent that such work has been cited and acknowledged within the text of my work.
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <fcntl.h>
#include "utility.h"

int main(int argc, char *argv[]) {
    // Check if a batch file is provided as an argument
    if (argc > 1) {
        batch_mode(argv[1]); // If yes, enter batch mode
        return 0; // Exit the program after batch execution
    }

    char input[MAX_COMMAND_LENGTH]; // Buffer to store user input
    char *tokens[MAX_TOKENS]; // Array to store tokenized input
    int num_tokens; // Number of tokens in the input

    // Main shell loop
    while (1) {
        display_prompt(); // Display shell prompt

        // Read user input
        if (!read_command(input)) {
            continue; // If input reading fails, continue to next iteration
        }

        // Tokenize user input
        num_tokens = tokenize(input, tokens);

        // Check if the input corresponds to a built-in command
        if (handle_builtin_commands(num_tokens, tokens)) {
            continue; // If yes, continue to next iteration
        }

        // Check if the command should be executed in the background
        int background = 0;
        if (num_tokens > 0 && strcmp(tokens[num_tokens - 1], "&") == 0) {
            background = 1;
            tokens[num_tokens - 1] = NULL; // Remove the "&" token
        }

        // Execute the command
        execute_command(tokens, background);
    }

    return 0; // Return 0 to indicate successful program execution
}
