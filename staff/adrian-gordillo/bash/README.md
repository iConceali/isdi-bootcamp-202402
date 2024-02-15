# BASH

Command-line intergace commands typical in BASH.

## pwd (Ver carpeta actual)

```sh
$ pwd

/Users/adria
```

## ls (listar contenido directorio)

```sh

$ ls

Documents
Downloads
workspace
```

## ls -l (info ampliada del conteido del directorio)

```sh

$ ls -l

drwxr-xr-x 1 adria 197609       0 Feb  5 19:13  Desktop/
drwxr-xr-x 1 adria 197609       0 Feb  5 17:02  Documents/
drwxr-xr-x 1 adria 197609       0 Feb  5 20:26  Downloads/
```

## ls -a (mostrar archivos ocultos)

```sh

$ ls -a

 .node_repl_history
 .quokka/
 .vscode/
 .wallaby/
```

## touch "xxxx" (crear archivo vacío)

```sh

touch ahello.world
```

## .nombreArchivo (el . significa oculto)

```sh

 .node_repl_history
 .quokka/
 .vscode/
 .wallaby/
```

## mkdir (crear carpeta)

```sh

mkdir workspace
```

## mv "xxx" (mover carpeta y se puede renombrar)

```sh

mv hello.world hola.mundo
```

## kill -9 <PID> (cerrar task)

```sh

kill -9 8763
```

## rm -rf <nombre_archivo> (eliminar carpeta y todo su contenido)

```sh

rm -rf workspace
```

## rsync -va --del <from> <to> (synchronizes all files and folders from-to)

```sh
$ rsync va --del ./pepito /Users/my-user/pepito
```
