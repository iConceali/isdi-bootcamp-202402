# BASH

Command-line intergace commands typical in BASH.

## pwd (See current folder)

```sh
$ pwd

/Users/adria
```

## ls (list directory content)

```sh

$ ls

Documents
Downloads
workspace
```

## ls -l (extended information on directory content)

```sh

$ ls -l

drwxr-xr-x 1 adria 197609       0 Feb  5 19:13  Desktop/
drwxr-xr-x 1 adria 197609       0 Feb  5 17:02  Documents/
drwxr-xr-x 1 adria 197609       0 Feb  5 20:26  Downloads/
```

## ls -a (show hidden files)

```sh

$ ls -a

 .node_repl_history
 .quokka/
 .vscode/
 .wallaby/
```

## touch "xxxx" (create empty file)

```sh

touch ahello.world
```

## .nombreArchivo (the . means hidden)

```sh

 .node_repl_history
 .quokka/
 .vscode/
 .wallaby/
```

## mkdir (create folder)

```sh

mkdir workspace
```

## mv "xxx" (move folder and can be renamed)

```sh

mv hello.world hola.mundo
```

## kill -9 <PID> (close task)

```sh

kill -9 8763
```

## rm -rf <file_name> (delete folder and all its contents)

```sh

rm -rf workspace
```

## rsync -va --del <from> <to> (synchronizes all files and folders from-to)

```sh
$ rsync va --del ./pepito /Users/my-user/pepito
```
