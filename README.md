# localFS

LocalFS turns the Complex tables of the browser's LocalStorage into a simple files and folders interface to make it easier for the programmer to store, retrieve and organize data.

--------------------
### Download/Setup
1. <a href="localFSlibrary.js" download>Download localFS</a>
2. Add localFS to your project by using a script tag on your html head
3. You're all set, Happy Hacking!
---------------------
### Features 
1. [Create Folder](#localfscreatefilepathnamecont)
2. [Create File](#localfscreatefilepathnamecont)
3. [Get Folder Contents](#localfsgetfoldercontentspath)
4. [Get File Contents](#localfsgetfilecontentspathfilename)
5. [Delete File](#localfsdeletefilepathname)
6. [Delete Folder](#localfsdeletefolderpath)

-----------------------
### Limitations
- Paths must always start at root folder (./)
- Only Strings are allowed as function parameters
- Empty parameters will result in null which cannot be deleted by any localFS function(Avoid null)
- Don't use slashes on files or folders names
- Filtering previously mentioned stuff feature to prevent errors has not been added yet to the software so keep in mind this things when building your software

------------------------------------------------
### Definitions
- path is a string that starts on root folder (./)
- fileName is a string
- cont is the content of the file to be created

-------------------------------------------------
## Functions Examples
### localFS.createFolder(path)
```javascript
localFS.createFolder("./folder/folder2");
//Will Create all folders in the path that doesn't exist
```
### localFS.createFile(path,name,cont)
```javascript
localFS.createFile("./folder/folder2","file1","Some text");
//Will Create file on the desired folder
```
### localFS.getFolderContents(path)
```javascript
//The function returns an object, so we must save the object on a variable
var folderContents=localFS.getFolderContents("./folder/folder2");
//this will return the folder contents of folder2

console.log(folderContents.folders);
//Will log an array of all folders in the folder

console.log(folderContents.files);
//Will log an array of all files in the folder
```
### localFS.deleteFile(path,name)
```javascript
localFS.deleteFile("./folder/folder2","file1");
//Deletes file in the specified folder
```
### localFS.deleteFolder(path)
```javascript
localFS.deleteFolder("./folder");
//Will delete the folder, sub-folders and all related  files
```
### localFS.getFileContents(path,fileName)
```javascript
localFS.getFileContents("./folder/folder2","file1");
//returns file contents as string

console.log(localFS.getFileContents("./folder/folder2","file1"));
//This will log file contents to the console
```
----------------------------------------------------
#### Made in Puerto Rico by Radamés J. Valentín Reyes