# ANTI-PLAGIARISM POLICY
# 
# [Abul Hasan Sheik Madhar Ali]
# [22390436]
# 
# I declare that this material, which I now submit for assessment, is entirely my own work and has not been taken from the work of others save and to the extent that such work has been cited and acknowledged within the text of my work.



# Compiler
CC = gcc

# Compiler flags
CFLAGS = -Wall -Wextra

# Directories
SRCDIR = src
BINDIR = bin

# Source files
SOURCES = $(wildcard $(SRCDIR)/*.c)

# Object files
OBJECTS = $(patsubst $(SRCDIR)/%.c,$(BINDIR)/%.o,$(SOURCES))

# Binary name
TARGET = $(BINDIR)/myshell

# Rule to build the binary
$(TARGET): $(OBJECTS)
	$(CC) $(CFLAGS) $^ -o $@

# Rule to compile source files
$(BINDIR)/%.o: $(SRCDIR)/%.c
	$(CC) $(CFLAGS) -c $< -o $@

# Phony target to clean object files and binary
clean:
	rm -f $(BINDIR)/*.o $(TARGET)
