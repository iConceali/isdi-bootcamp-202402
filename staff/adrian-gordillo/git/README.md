# <span style="color:ORANGE">GIT</span>

Command-line intergace commands typical in GIT.

## <span style="color:gold">git init</span>

_creates a new Git repository._

```sh
$ git init
```

## <span style="color:gold">git remote add origin "repository address"</span>

_To add a new remote, use the git remote add command on the terminal, in the directory your repository is stored at.._

```sh
$ git remote add origin https://github.com/iConceali/helloworld
```

## <span style="color:gold">git add "file name"</span>

_adds a change in the working directory to the staging area. It tells Git that you want to include updates to a particular file in the next commit._

```sh
$ git add
```

## <span style="color:gold">git commit -m "comment"</span>

_captures a snapshot of the project's currently staged changes. adding a comment to these changes._

```sh
$ git commit -m "comment"
```

## <span style="color:gold">git commit -m --amend "comment"</span>

_edit last commit._

```sh
$ git commit -m --amend "comment"
```

## <span style="color:gold">git push</span>

_used to upload local repository content to a remote repository._

```sh
$ git push
```

## <span style="color:gold">git push -f</span>

_force git push._

```sh
$ git push -f
```

## <span style="color:gold">git push -u origin "branch name"</span>

_upload the "branch name" to the repository_

```sh
$ git push -u origin develop
```

## <span style="color:gold">git push --set-upstream origin "branch name" -f</span>

_update the files. (the -f forces it)_

```sh
$ git push --set-upstream origin main -f
```

## <span style="color:gold">git branch</span>

_show existing branches_

```sh
$ git branch
```

Example:

```sh
 develop
  feature/arrays
  feature/bash
  feature/complex_challenge
* feature/git
  feature/playground
  feature/space-invaders
  feature/strings
  main
```

## <span style="color:gold">git branch "branch name"</span>

_show existing branch_

```sh
$ git branch feature/pepito
```

## <span style="color:gold">git branch -B "branch name"</span>

_remove branch_

```sh
$ git branch -B feature/bash
```

## <span style="color:gold">git status</span>

_displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git._

```sh
$ git status
```

Example:

```sh
$ git status
On branch feature/git
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        staff/adrian-gordillo/README.md

nothing added to commit but untracked files present (use "git add" to track)
```

## <span style="color:gold">git log</span>

_lists the commits made in that repository in reverse chronological order._

```sh
$ git log
```

Example:

```sh
$ git log
commit a72295f1e52b64b1e3679ae8cce724a77711eefb (HEAD -> feature/git, origin/develop, develop)
Author: iConceali <adrian.gc89@gmail.com>
Date:   Wed Feb 14 13:04:44 2024 +0100

    add git ignoring #217

commit f151d569ad1638d6eb02f6a039ccef07331262b1
Author: iConceali <adrian.gc89@gmail.com>
Date:   Wed Feb 14 12:52:53 2024 +0100
```

## <span style="color:gold">git log --graph</span>

_creates a graphic overview of how a developer's various development pipelines have branched and merged over time. shows the branches created chronologically_

```sh
$ git log --graph
```

Example:

```sh
$ git log --graph
* commit a72295f1e52b64b1e3679ae8cce724a77711eefb (HEAD -> feature/git, origin/develop, develop)
| Author: iConceali <adrian.gc89@gmail.com>
| Date:   Wed Feb 14 13:04:44 2024 +0100
|
|     add git ignoring #217
|
* commit f151d569ad1638d6eb02f6a039ccef07331262b1
| Author: iConceali <adrian.gc89@gmail.com>
| Date:   Wed Feb 14 12:52:53 2024 +0100
```

## <span style="color:gold">git config --list</span>

_shows pc configuration_

```sh
$ git config --list
```

Example:

```sh
$ git config --list
diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=openssl
http.sslcainfo=C:/Program Files/Git/mingw64/etc/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
```

## <span style="color:gold">git checkout "file name"</span>

_recover latest version of a file_

```sh
$ git checkout README.md
```

## <span style="color:gold">git checkout 'branch name'</span>

_change branch_

```sh
$ git checkout feature/pepito
```

## <span style="color:gold">git reset "commit id"</span>

_we use when we want to move the repository back to a previous commit , discarding any changes made after that commit_

```sh
$ git checkout a72295f1e52b64b1e3679ae8cce724a77711eefb
```

## <span style="color:gold">Command combo to update changes</span>

_With these 3 commands and following this order we can apply changes, update them and push them to the repository._

```sh
$ git add "folder/file name"
$ git commit -m "comment"
$ git push (or git push -f)
```
