```js
/*
 ██████╗ ██╗████████╗
██╔════╝ ██║╚══██╔══╝
██║  ███╗██║   ██║   
██║   ██║██║   ██║   
╚██████╔╝██║   ██║   
 ╚═════╝ ╚═╝   ╚═╝                                                          
*/
```
# Git & GitHub - Cheatsheet

Quick reference for Git version control and GitHub workflows.

### 1. Initial Setup & Config

```bash
git config --global user.name "Adrian Velazquez"
git config --global user.email "hire.adrianv@gmail.com"
git config --list                        # view all current config settings
git config --global init.defaultBranch main  # sets "main" as the default branch name for new repos
```

### 2. Starting a Repository

```bash
git init                                  # turns the current folder into a new git repo
git clone https://github.com/user/repo.git  # copies an existing remote repo to your machine
git clone https://github.com/user/repo.git my-folder-name  # clone into a custom folder name
```

### 3. The Basic Workflow

```bash
git status                # shows what's changed, staged, or untracked
git add file.js               # stages a specific file
git add .                       # stages everything changed/new in the current directory
git add src/                      # stages everything inside a specific folder

git commit -m "Add login form"      # commits staged changes with a message
git commit -am "Fix typo"             # stages AND commits in one step (only for already-tracked files)

git push                                # sends local commits to the remote
git push origin main                      # explicit version: push to "origin" remote, "main" branch
git pull                                    # fetches AND merges remote changes into your current branch
```

### 4. Checking History

```bash
git log                       # full commit history
git log --oneline               # condensed, one line per commit
git log --oneline --graph          # visual branch/merge structure
git log -p file.js                   # shows the actual changes (diff) for each commit touching this file

git diff                                # shows unstaged changes
git diff --staged                         # shows staged changes not yet committed
git diff main feature-branch                # compares two branches

git show abc1234                              # shows details of a specific commit by hash
```

### 5. Branching

```bash
git branch                        # lists local branches, * marks the current one
git branch feature-login              # creates a new branch (doesn't switch to it)
git checkout feature-login              # switches to an existing branch
git checkout -b feature-login             # creates AND switches to a new branch in one step
git switch feature-login                    # modern alternative to checkout, for switching branches only
git switch -c feature-login                   # modern alternative, creates AND switches

git branch -d feature-login          # deletes a branch (safe — refuses if unmerged changes exist)
git branch -D feature-login          # force-deletes a branch, even with unmerged changes

git branch -m old-name new-name       # renames a branch
```

### 6. Merging

```bash
git checkout main                  # switch to the branch you want to merge INTO
git merge feature-login               # merges feature-login into main

# merge conflicts — when two branches changed the same lines differently:
# 1. Git marks the conflicting section in the file with <<<<<<< ======= >>>>>>> markers
# 2. manually edit the file to resolve which version (or combination) to keep
# 3. remove the conflict markers themselves
git add resolved-file.js               # marks the conflict as resolved
git commit                                # completes the merge
```

### 7. Rebasing (alternative to merging)

```bash
git checkout feature-login
git rebase main                     # replays feature-login's commits on top of main's latest commit,
                                       # creating a cleaner, linear history than a merge commit would

# Rule of thumb: rebase your own local/unshared branches to keep history clean;
# avoid rebasing branches other people are also working on/pulling from — it
# rewrites commit history, which causes real problems for anyone else using that branch.
```

### 8. Undoing Changes

```bash
git restore file.js                  # discards uncommitted changes to a file, back to last commit
git restore --staged file.js            # unstages a file, but KEEPS the changes in the working directory

git reset --soft HEAD~1                    # undoes the last commit, keeps changes staged
git reset --mixed HEAD~1                     # undoes the last commit, keeps changes but unstaged (default mode)
git reset --hard HEAD~1                        # undoes the last commit AND discards the changes entirely — destructive

git revert abc1234                                # creates a NEW commit that undoes a specific past commit
                                                      # (safer than reset for shared/pushed history, since it doesn't rewrite anything)

git commit --amend -m "Corrected message"            # edits the most recent commit's message (or add more staged changes to it)
```

### 9. Stashing

```bash
git stash                       # temporarily shelves uncommitted changes, restores a clean working directory
git stash list                    # shows all stashed changesets
git stash pop                       # re-applies the most recent stash AND removes it from the stash list
git stash apply                       # re-applies the most recent stash, but KEEPS it in the stash list too
git stash drop                          # deletes a stash without applying it
git stash push -m "WIP: header layout"    # stashes with a custom, identifiable message
```

Useful when you need to quickly switch branches or pull changes, but aren't ready to commit what you're currently working on.

### 10. Remotes

```bash
git remote -v                                     # lists remotes and their URLs
git remote add origin https://github.com/user/repo.git   # connects a local repo to a remote
git remote remove origin                             # disconnects a remote
git remote set-url origin https://github.com/user/new-repo.git  # changes a remote's URL

git fetch                     # downloads remote changes WITHOUT merging them into your branch
git fetch origin main            # fetch a specific branch from a specific remote

git push -u origin main             # pushes AND sets this as the default upstream for future plain "git push"
git push --force                       # overwrites remote history with local — dangerous, avoid on shared branches
git push --force-with-lease              # safer alternative — fails if someone else pushed changes you haven't seen yet
```

### 11. `.gitignore`

```bash
# .gitignore — lists files/folders git should never track
node_modules/
dist/
.env
.DS_Store
*.log

# if a file was ALREADY tracked before being added to .gitignore, it must be
# explicitly untracked (gitignore alone won't remove it from history going forward):
git rm --cached file.js
```

### 12. Tags

```bash
git tag v1.0.0                     # creates a lightweight tag on the current commit (common for releases)
git tag -a v1.0.0 -m "First release"  # annotated tag — includes a message, author, date (preferred for real releases)
git tag                                 # lists all tags
git push origin v1.0.0                    # tags aren't pushed automatically — must push explicitly
git push origin --tags                      # pushes all tags at once
```

### 13. Common Troubleshooting

```bash
git status                          # step one for almost everything — see what state you're actually in

# "fatal: not a git repository"
git init                               # you're not inside an initialized repo yet

# accidentally committed to the wrong branch
git reset --soft HEAD~1                   # undo the commit, keep the changes
git stash                                    # shelve them
git checkout correct-branch                     # switch to where they should go
git stash pop                                      # reapply them there

# need to see what changed in a specific commit
git show abc1234

# local branch is behind the remote
git pull                              # fetch + merge in one step
git pull --rebase                        # fetch, then rebase local commits on top instead of merging

# "detached HEAD" state (after checking out a specific commit instead of a branch)
git checkout main                           # gets you back to a normal branch
```

### 14. GitHub-Specific Workflow

```bash
# Forking — creating your own copy of someone else's repo on GitHub (done via the GitHub UI, not git itself)
git clone https://github.com/your-username/forked-repo.git
git remote add upstream https://github.com/original-owner/original-repo.git
git fetch upstream
git merge upstream/main                  # pulls in changes from the original repo into your fork

# Pull Requests — proposing your branch's changes be merged into another branch (created via GitHub's UI/web interface)
# typical flow:
git checkout -b feature-new-section
# ...make changes, commit...
git push -u origin feature-new-section
# then open a Pull Request on github.com comparing feature-new-section -> main

# Issues — tracked via GitHub's UI, but can be referenced directly in commit messages:
git commit -m "Fix header overflow bug, closes #12"   # auto-closes issue #12 when merged to the default branch
```

### 15. GitHub Pages Deployment (relevant to your own portfolio/sandbox workflow)

```bash
# standard workflow for a project using the gh-pages npm package (React/Vite projects)
git add .
git commit -m "Update content"
git push origin main              # pushes source code to the main branch
npm run deploy                       # builds the project AND pushes the compiled output to the gh-pages branch,
                                        # which is what GitHub Pages actually serves as the live site
```

### Notes

- `git status` is the single most useful troubleshooting command — running it before and after nearly every other git command builds the habit of always knowing exactly what state your repo is in.
- **`reset` rewrites history, `revert` adds new history** — this distinction matters most once code has already been pushed/shared: reverting is safe for shared branches, resetting (especially `--hard`) can cause real problems for anyone else working off that branch.
- Merge vs. rebase (sections 6-7) is a common early point of confusion — merge preserves the exact history of what happened and when (including a merge commit), rebase rewrites history into a cleaner straight line. Neither is universally "correct" — teams often have a stated preference either way.
- `.gitignore` only prevents tracking NEW files — if something was already committed before being ignored, it has to be explicitly removed from tracking (`git rm --cached`) in addition to adding it to `.gitignore`.
- This sheet covers git the tool plus GitHub-specific workflow layered on top (forks, PRs, Pages deployment) — the deployment section reflects the same `gh-pages` package workflow already used in your own portfolio and React Sandbox projects.