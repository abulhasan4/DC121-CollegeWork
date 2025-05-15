/*
ANTI-PLAGIARISM POLICY

[Abul Hasan Sheik Madhar Ali]
[22390436]

I declare that this material, which I now submit for assessment, is entirely my own work and has not been taken from the work of others save and to the extent that such work has been cited and acknowledged within the text of my work.
*/

#ifndef UTILITY_H
#define UTILITY_H

#include <stdio.h>

#define MAX_PATH_LENGTH 1024 // Maximum length of path
#define MAX_COMMAND_LENGTH 1024 // Maximum length of command
#define MAX_TOKENS 64 // Maximum number of tokens

// Function to display shell prompt
void display_prompt(); 

// Function to read command from user input
int read_command(char *input); 

// Function to tokenize the input command
int tokenize(char *input, char *tokens[]); 

// Function to handle batch mode
void batch_mode(const char *batchfile); 

// Function to handle built-in commands
int handle_builtin_commands(int num_tokens, char *tokens[]); 

// Function to execute commands
void execute_command(char *tokens[], int background); 

// Function to handle 'cd' command
void handle_cd(int num_tokens, char *tokens[]); 

// Function to handle 'clr' command
void handle_clr(); 

// Function to handle 'dir' command
void handle_dir(int num_tokens, char *tokens[]); 

// Function to handle 'environ' command
void handle_environ(); 

// Function to handle 'echo' command
void handle_echo(int num_tokens, char *tokens[]); 

// Function to handle 'help' command
void handle_help(); 

// Function to handle 'pause' command
void handle_pause(); 

// Function to handle 'quit' command
void handle_quit(); 

#endif /* UTILITY_H */
