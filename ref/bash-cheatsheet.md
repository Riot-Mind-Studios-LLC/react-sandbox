```js
/*
██████╗  █████╗ ███████╗██╗  ██╗
██╔══██╗██╔══██╗██╔════╝██║  ██║
██████╔╝███████║███████╗███████║
██╔══██╗██╔══██║╚════██║██╔══██║
██████╔╝██║  ██║███████║██║  ██║
╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝                                                  
*/
```
# Terminal / Bash - Cheatsheet

Quick reference for terminal navigation, file operations, and bash scripting basics.

### 1. Navigation

```bash
pwd                        # print working directory — shows where you currently are
ls                            # list files/folders in the current directory
ls -la                           # list ALL (including hidden/.dotfiles), long format (permissions, size, date)
ls -lh                              # long format with human-readable file sizes (KB/MB instead of bytes)

cd folder-name                        # move into a folder
cd ..                                    # move up one directory
cd ../..                                    # move up two directories
cd ~                                           # jump to your home directory
cd -                                              # jump back to the PREVIOUS directory you were in
cd /Users/riotman/Documents                          # absolute path — always works, regardless of current location

# spaces in folder/file names need to be escaped or quoted
cd Business/08_dev/_Tutorials/03\ React
cd "Business/08_dev/_Tutorials/03 React"
```

### 2. Viewing Files

```bash
cat file.txt                  # prints an entire file's contents to the terminal
less file.txt                    # opens a file for scrollable viewing (q to quit, / to search)
head file.txt                       # shows the first 10 lines
head -n 20 file.txt                    # shows the first 20 lines
tail file.txt                             # shows the last 10 lines
tail -f log.txt                              # "follow" — keeps watching and printing new lines as they're added (great for live logs)

wc -l file.txt                                   # counts lines in a file
```

### 3. Creating Files & Directories

```bash
touch file.txt                # creates a new empty file (or updates its timestamp if it already exists)
mkdir new-folder                 # creates a new directory
mkdir -p path/to/nested/folder      # creates nested directories in one go, even if parent folders don't exist yet
```

### 4. Copying, Moving & Deleting

```bash
cp file.txt copy.txt                 # copies a file
cp -r folder-a folder-b                 # copies a folder recursively (required for directories)

mv file.txt newname.txt                    # renames a file (mv is also how renaming works in bash)
mv file.txt ../other-folder/                  # moves a file to a different folder

rm file.txt                                      # deletes a file — NO trash/undo, permanent
rm -r folder-name                                   # deletes a folder and everything inside it, recursively
rm -rf folder-name                                     # same, but forces it without confirmation prompts — use carefully
```

### 5. Reading Directory Structure

```bash
ls -la                       # flat listing of current directory
tree                            # visual nested tree of files/folders (may need: brew install tree)
tree -L 2                          # limits depth to 2 levels — useful for large project folders
find . -name "*.jsx"                  # finds all .jsx files, starting from the current directory, recursively
```

### 6. Wildcards & Pattern Matching

```bash
ls *.js                    # lists all files ending in .js
ls *.{js,jsx}                 # lists all files ending in .js OR .jsx
rm *.log                         # deletes all .log files in the current directory
cp src/*.css dist/                  # copies all .css files from one folder to another
```

### 7. Permissions

```bash
ls -l file.txt              # shows permissions in the first column, e.g. -rwxr--r--
chmod +x script.sh              # adds execute permission (common for running shell scripts directly)
chmod 755 file.txt                 # sets exact permissions numerically (owner: rwx, group/others: r-x)
chmod -R 755 folder/                  # applies recursively to a folder and everything inside it

sudo command                             # runs a command with admin/root privileges — asks for your password
```

```
Permission digits:  4 = read, 2 = write, 1 = execute (added together)
755 = owner: 7 (rwx), group: 5 (r-x), others: 5 (r-x)
644 = owner: 6 (rw-), group: 4 (r--), others: 4 (r--)   <- common default for regular files
```

### 8. Piping & Redirection

```bash
command1 | command2          # PIPE — sends command1's output as input to command2
ls -la | grep ".jsx"             # lists files, then filters to only lines containing ".jsx"

command > file.txt                  # REDIRECT — sends output to a file, OVERWRITES existing content
command >> file.txt                    # same, but APPENDS instead of overwriting
command < file.txt                        # uses a file's contents AS input to a command

command 2> errors.txt                        # redirects only ERROR output to a file
command > output.txt 2>&1                       # redirects both regular AND error output to the same file
```

### 9. Searching

```bash
grep "useState" file.js                 # searches for a text pattern inside a file, prints matching lines
grep -r "useState" src/                    # searches recursively through every file in a folder
grep -ri "usestate" src/                      # case-insensitive search
grep -n "useState" file.js                       # shows line numbers alongside matches

find . -name "*.test.js"                            # finds files by name pattern
find . -type d -name "components"                      # finds DIRECTORIES specifically, by name
find . -mtime -1                                           # finds files modified in the last 1 day
```

### 10. Process Management

```bash
ps aux                       # lists all running processes
ps aux | grep node               # filters to processes matching "node"

kill 1234                          # stops a process by its PID (process ID)
kill -9 1234                          # force-kills a process that won't stop normally

lsof -i :3000                            # shows what process is using port 3000 (common when a dev server won't start)
kill -9 $(lsof -t -i :3000)                 # kills whatever's occupying port 3000, in one line

Ctrl + C                                       # stops/interrupts the currently running command in this terminal
Ctrl + Z                                          # suspends the current process (can be resumed later with "fg")
```

### 11. Environment Variables & PATH

```bash
echo $PATH                    # shows the list of directories the terminal searches for commands
export MY_VAR="hello"            # sets an environment variable for the current terminal session
echo $MY_VAR                        # reads it back

# persisting environment variables — add export lines to your shell's config file:
# ~/.zshrc (default on modern macOS) or ~/.bash_profile (older macOS / bash)
echo 'export MY_VAR="hello"' >> ~/.zshrc
source ~/.zshrc                        # reloads the config file into the current session without restarting
```

### 12. Aliases

```bash
# an alias is a shortcut for a longer command — add these to ~/.zshrc to persist them
alias gs="git status"
alias gc="git commit -m"
alias dev="npm run dev"

source ~/.zshrc         # reload after adding new aliases
```

### 13. Command History & Shortcuts

```bash
history                    # shows a list of previously run commands
!123                          # re-runs command number 123 from history
!!                                # re-runs the LAST command
!git                                 # re-runs the most recent command starting with "git"

Up Arrow / Down Arrow                    # cycle through previous commands
Ctrl + R                                    # search backward through command history interactively
Ctrl + A                                       # jump to the beginning of the current line
Ctrl + E                                          # jump to the end of the current line
Ctrl + L                                             # clears the terminal screen (same as typing "clear")
Tab                                                     # auto-completes file/folder names and commands
```

### 14. Bash Scripting Basics

```bash
#!/bin/bash                       # "shebang" line — tells the system this is a bash script, always the first line

# variables — no spaces around the equals sign
NAME="Adrian"
echo "Hello, $NAME"

# if statements
if [ "$NAME" == "Adrian" ]; then
  echo "Match found"
elif [ "$NAME" == "Someone" ]; then
  echo "Different match"
else
  echo "No match"
fi

# for loops
for file in *.js; do
  echo "Found: $file"
done

# reading command-line arguments passed to the script
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"

# making a script executable and running it
chmod +x myscript.sh
./myscript.sh
```

### 15. macOS-Specific Notes

```bash
open .                         # opens the current folder in Finder
open file.pdf                     # opens a file with its default macOS application
pbcopy < file.txt                    # copies a file's contents to the clipboard
echo "hello" | pbcopy                   # copies a string directly to the clipboard
pbpaste                                    # pastes clipboard contents into the terminal

brew install tree                             # Homebrew — the standard macOS package manager for CLI tools
brew list                                        # lists installed Homebrew packages
brew update && brew upgrade                         # updates Homebrew itself and all installed packages

# ~/.zshrc is the default shell config file on modern macOS (zsh is the default shell since Catalina)
```

### Notes

- **`rm` has no undo, no trash bin** — unlike deleting a file in Finder, a terminal `rm` (especially `rm -rf`) is permanent and immediate. Always double-check the path before running it, particularly with wildcards or recursive flags.
- `~/.zshrc` is the file to edit for anything meant to persist across terminal sessions — environment variables, aliases, PATH changes. After editing it, either run `source ~/.zshrc` or open a new terminal tab for the changes to take effect.
- `lsof -i :PORT` (section 10) is genuinely one of the most useful troubleshooting commands for local dev work — it's the fix for "port 3000 is already in use" errors when a previous dev server didn't shut down cleanly.
- Piping (`|`) and redirection (`>`, `>>`) are two different things worth keeping straight: piping sends output from one COMMAND into another command; redirection sends output into a FILE.
- This sheet covers general terminal/bash usage — the git-specific commands you run constantly (`git add`, `git commit`, `git push`, etc.) have their own dedicated cheat-sheet.