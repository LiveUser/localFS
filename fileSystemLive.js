//Test File System
window.onload=()=>{
    //alert("Hello World");
    document.getElementById("path").innerHTML="./";
    showContents();
};
function showContents(){
    //console.log("Regenerated");
    document.getElementById("container").innerHTML="";
    var currentFolder=localFS.getFolderContents(document.getElementById("path").innerHTML);
    for(i=0;i<currentFolder.folders.length;i++){
        document.getElementById("container").innerHTML+='<div onclick="delFold(this);changeDir(this);" name="'+currentFolder.folders[i]+'"class="fileOrFolder"><img class="logo" src="folder.svg"/><div class="name">'+currentFolder.folders[i]+'</div>';
    }
    for(i=0;i<currentFolder.files.length;i++){
        document.getElementById("container").innerHTML+='<div onclick="delFile(this);" name="'+currentFolder.files[i]+'"class="fileOrFolder"><img class="logo" src="file.svg"/><div class="name">'+currentFolder.files[i]+'</div>';
    }
}

function makeDir(){
    var dirName=prompt("Enter Folder Name");
    //Fix keeps adding /
    if(document.getElementById("path").innerHTML!=="./"){
    localFS.createFolder(document.getElementById("path").innerHTML+"/"+dirName);
    showContents();
    }else{
    localFS.createFolder(document.getElementById("path").innerHTML+dirName);
    showContents();
    }
}
function makeFile(){
    var fileName=prompt("Enter File Name");
    localFS.createFile(document.getElementById("path").innerHTML,fileName,"Empty");
    showContents();
}

function changeDir(clicked){
    //.name not working, which is why i used .attributes["name"].value instead
    if(document.getElementById("delFol").attributes["name"].value=="disabled"){
    if(document.getElementById("path").innerHTML=="./"){
    document.getElementById("path").innerHTML+=clicked.attributes["name"].value;
    }else{
        document.getElementById("path").innerHTML+="/"+clicked.attributes["name"].value;
    }
    document.getElementById("container").innerHTML="";
    showContents();
    }else{
        //do nothing delete folder enabled
    }
}

function upDir(){
    var road=document.getElementById("path").innerHTML;
    road=road.split("/");
    if(road.length>2){
        var newRoad=".";
        for(f=1;f<(road.length-1);f++){
            newRoad+="/"+road[f];
        }
        document.getElementById("path").innerHTML=newRoad;
        showContents();
    }else{
        document.getElementById("path").innerHTML="./";
        showContents();
    }
}
function delMode(){
    if(document.getElementById("delete").attributes["name"].value=="enabled"){
        document.getElementById("delete").attributes["name"].value="disabled";
        document.getElementById("delete").style.backgroundColor="white";
    }else{
        document.getElementById("delete").attributes["name"].value="enabled";
        document.getElementById("delete").style.backgroundColor="red";
    }
}

function delFile(fileNam){
    if(document.getElementById("delete").attributes["name"].value=="enabled"){
    let pat=document.getElementById("path").innerHTML;
    localFS.deleteFile(pat,fileNam.attributes["name"].value);
    showContents();
    }else{}
}

function delModeFolder(){
    if(document.getElementById("delFol").attributes["name"].value=="enabled"){
        document.getElementById("delFol").attributes["name"].value="disabled";
        document.getElementById("delFol").style.backgroundColor="white";
    }else{
        document.getElementById("delFol").attributes["name"].value="enabled";
        document.getElementById("delFol").style.backgroundColor="red";
    }
}

function delFold(na){
    if(document.getElementById("delFol").attributes["name"].value=="enabled"){
    let pat=document.getElementById("path").innerHTML;
    if(pat=="./"){
    localFS.deleteFolder(pat+(na.attributes["name"].value));
    //console.log("Delete "+pat+(na.attributes["name"].value));
    }else{
        localFS.deleteFolder(pat+"/"+(na.attributes["name"].value));
    }
    }else{}
    showContents();
}