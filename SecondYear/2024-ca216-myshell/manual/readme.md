# MyShell User Manual

Welcome to MyShell - a simple command-line interpreter for UNIX systems.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Basic Commands](#basic-commands)
3. [I/O Redirection](#io-redirection)
4. [Background Execution](#background-execution)
5. [Environment Variables](#environment-variables)
6. [References](#references)

## Getting Started
To start using MyShell, simply open your terminal and run the executable myshell. You can navigate through directories, execute commands, and perform various tasks using the shell prompt. Type in "./myshell".

MyShell comes packed with a set of basic commands that make it easy to navigate and interact with your system. Here's a quick rundown of these commands:

## Basic Commands

### cd: Change Directory  
   Use this command to move between different directories. For example, to navigate to a directory called "documents," you would type "cd documents". To go back to the previous directory, simply type "cd ..".

### clr: Clear Screen  
   This command clears the screen, giving you a fresh workspace to work with.

### dir: List Directory Contents  
   With the dir command, you can see a list of all the files and folders in your current directory.

### environ: List Environment Variables  
   The environ command shows you all the environment variables currently set in MyShell.

### echo: Display Arguments  
   Echo allows you to print text to the screen. For example, "echo Hello, World!" will display "Hello, World!" on the screen.

### help: Display User Manual  
   The help command shows you a user manual, providing information on how to use MyShell and its commands.

### pause: Pause Shell Operation  
   This command pauses the shell until you press the Enter key. Useful if you want to stop the shell temporarily.

### quit: Exit Shell  
   Use quit when you're done with MyShell and want to exit it.

### mkdir: Make Directory  
   This command creates a new directory with the specified name. For example, "mkdir new_folder" will create a directory named "new_folder."

### rmdir: Remove Directory  
    Rmdir removes a directory. For example, "rmdir old_folder" will delete a directory named "old_folder."

### ls: List Directory Contents  
    Similar to dir, ls also lists the contents of the current directory.

### pwd: Print Working Directory  
    Pwd shows you the full path of the directory you're currently in.

These commands provide the basic functionality you need to navigate, manage files, and interact with your system using MyShell.

## I/O Redirection
MyShell allows you to redirect input and output streams using the <, >, and >> symbols.

- <: This symbol means "take input from". So if you see < in a command, it means the shell will read the input from a file instead of from you typing on the keyboard.
  
- ">": This symbol means "send output to". If you see > in a command, it means the output will go to a file instead of being shown on the screen. If the file already exists, the contents will be replaced.
  
- ">>": This symbol also means "send output to", but it adds to the end of a file instead of replacing its contents.

So, if you want to run a program and save the results to a file, you can use >. And if you want to add more results to the same file without erasing what's already there, you can use >>.

## Background Execution
In MyShell, you can make a command run in the background by adding an ampersand (&) at the end of the command line. When you do this, the shell will start running the command but won't wait for it to finish. Instead, it will immediately return to the prompt, allowing you to enter more commands or do other things.

For example, if you're running a program that takes a long time to complete, you can put it in the background so that you can continue using the shell while it's running. This is useful for tasks that don't need your immediate attention or tasks that take a while to finish.

## Environment Variables
MyShell maintains environment variables, including the PWD variable for the current working directory. You can access and modify environment variables using built-in commands or by setting them in your shell configuration files.


## References

1. Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). *Operating System Concepts* (10th ed.). Wiley.

2. Stevens, R., Rago, S. A., & Fenner, B. (2013). *Advanced Programming in the UNIX Environment* (3rd ed.). Addison-Wesley Professional.

3. Robbins, A., & Robbins, A. (2005). *Learning the bash Shell: Unix Shell Programming* (3rd ed.). O'Reilly Media.

4. Love, R. (2010). *Linux Kernel Development* (3rd ed.). Addison-Wesley Professional.

5. Healy, G. (DCU LOOP). Notes on Unix shell scripting and how to build your shell.

---

**ANTI-PLAGIARISM POLICY**

**[Abul Hasan Sheik Madhar Ali]**
**[22390436]**
 
*I declare that this material, which I now submit for assessment, is entirely my own work and has not been taken from the work of others save and to the extent that such work has been cited and acknowledged within the text of my work.*