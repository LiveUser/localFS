# localFS

LocalFS turns the Complex tables of the browser's LocalStorage into a simple files and folders interface to make it easier for the user to store, retrieve and organize data.

### Features 
1. [Create Folder](#user-content-localfscreatefilepathnamecont)
2. Create File
3. Get Folder Contents
4. Get File Contents
5. Delete File
6. Delete Folder
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