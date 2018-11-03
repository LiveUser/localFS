let localFS=new Object();

function createRoot(){
      if(localStorage.getItem("./")===null){
        let contents=new Object();
        contents.folders=[];
        contents.files=[];
        localStorage.setItem("./",JSON.stringify(contents));
      }else{}  
}
createRoot();

localFS.createFolder=(path)=>{
        //Verify that path starts at root folder
        if(path.substring(0,2)=="./"){
                let breakPath=path.split("/");
                let progressivePath=".";
                //Create Unexistent Folders in Path
                for(l=1;l<breakPath.length;l++){
                progressivePath+="/"+breakPath[l];
                //console.log("Prog: "+progressivePath+" Value: "+(localStorage.getItem(progressivePath)===null));
                if(localStorage.getItem(progressivePath)===null){
                        let contents=new Object();
                        contents.folders=[];
                        contents.files=[];
                        localStorage.setItem(progressivePath,JSON.stringify(contents));
                        notifyPrevious(progressivePath,"folder");
                }else{
                    console.log("Folder on "+progressivePath+"  Already Exists");
                }
                }
        }else{
            console.log("Path Must start at Root folder Example: ./path");
        }
};

//createfile takes as parameter path name and content
//Why new files name has ""
localFS.createFile=(path,name,cont)=>{
        //save files inside the folder files array as object
        //add overwrite parameter in the future
        //Save the file in the form path+#+filename
        //console.log(filed);
        if(localStorage.getItem(path)!==null){
            let folder=localStorage.getItem(path);
            folder=JSON.parse(folder);
            let folderFiles=folder.files;
            //Verify that file doesn't exist on folder
            if(localStorage.getItem(path+"#"+name)===null){
            //add name to folder
            folderFiles.push(name);
            localStorage.setItem(path,JSON.stringify(folder));
            //create file
            localStorage.setItem(path+"#"+name,cont);
            }else{
                //File already exists
                console.log("File Already Exists");
            }
        }else{
             console.log("Path doesn't exists");
        }
};

function notifyPrevious(path1,type){
        //tell the previous folder that the new one exists
        let fracture=path1.split("/");
        let newPath=".";
        if(fracture.length>2){
        for(f=1;f<(fracture.length-1);f++){
           newPath+="/"+fracture[f]; 
        }
        }else{
           newPath="./"; 
        }
        //console.log(newPath);
        //Add to folder contents
        let folderContents=localStorage.getItem(newPath);
        //console.log(folderContents);
        folderContents=JSON.parse(folderContents);
        //console.log(folderContents);
        if(type=="folder"){
             folderContents.folders.push(fracture[fracture.length-1]);
             localStorage.setItem(newPath,JSON.stringify(folderContents));
        }else{
             folderContents.files.push(fracture[fracture.length-1]);
             localStorage.setItem(newPath,JSON.stringify(folderContents));
        }
}

localFS.getFolderContents=(path)=>{
      var fold= localStorage.getItem(path);
      fold=JSON.parse(fold);
      //returns an object with folder contents
      return fold;
};
//Delete folder and de-reference it on the folder
localFS.deleteFile=(path,name)=>{
      localStorage.removeItem(path+"#"+name);
      let folder=localStorage.getItem(path);
      folder=JSON.parse(folder);
      let found=false;
      let g=0;
      while(found===false){
            if(folder.files[g]==name){
            folder.files.splice(g,1);
            found=true;
            }else{}
            g+=1; 
      }
      localStorage.setItem(path,JSON.stringify(folder));
};
//Delete folder and all of its contents
localFS.deleteFolder=(path)=>{
      //console.log(path);
      var startFolder=localFS.getFolderContents(path);
      //console.log(startFolder);
      var nextFolders=[];
      var oldFolders=[];
      let allFolders=[];
      let finished=false;
      for(i=0;i<startFolder.folders.length;i++){
            oldFolders.push(path+"/"+startFolder.folders[i]);
            allFolders.push(path+"/"+startFolder.folders[i]);
      }
      //console.log("Old Folders:");
      //console.log(oldFolders);
      while(finished===false){
            for(c=0;c<oldFolders.length;c++){
                  //console.log(oldFolders[c]);
                  let w=localFS.getFolderContents(oldFolders[c]);
                  //console.log(w);
                  for(l=0;l<w.folders.length;l++){
                      nextFolders.push(oldFolders[c]+"/"+w.folders[l]);
                      allFolders.push(oldFolders[c]+"/"+w.folders[l]);
                      //path is wrong
                      //console.log(oldFolders[c]+"/"+w.folders[l]);
                  }
            }
            oldFolders=nextFolders;
            //console.log(oldFolders);
            nextFolders=[];
            if(oldFolders.length===0){
               finished=true;
               allFolders.push(path);
               //console.log("All Folders");
               //console.log(allFolders);
               //console.log(oldFolders);
            }else{}
      }
      //Delete everything on all folders
      //Delete files first to be eble to check files on folders
      for(k=0;k<allFolders.length;k++){
            //fix doc null error
            //console.log(allFolders[k]);
            let docs=localFS.getFolderContents(allFolders[k]);
            //console.log(doc.files.length);
            for(v=0;v<docs.files.length;v++){
                  localFS.deleteFile(allFolders[k],docs.files[v]);
                  //console.log("Deleted "+docs.files[v]);
            }
      }
      for(v=0;v<allFolders.length;v++){
            localStorage.removeItem(allFolders[v]);
      }
      //remove reference from previous folder
      var rPath=path.split("/");
      if(rPath.length==2){
          let rContents=localFS.getFolderContents("./");
          let counter=0;
          let found=false;
          while(found!==true){
            //console.log(rContents.folders[counter]+" == "+rPath[1]);
            if(rContents.folders[counter]==rPath[1]){
                  rContents.folders.splice(counter,1);
                  localStorage.setItem("./",JSON.stringify(rContents));
                  found=true;
            }else{}
            counter+=1;
          }
      }else{
          let pathHolder=path.split("/");
          let newPath=".";
          for(i=1;i<pathHolder.length-1;i++){
            newPath+="/"+pathHolder[i];
          }
          console.log(newPath);
          let rContents=localFS.getFolderContents(newPath);
          //console.log(rContents);
          let counter=0;
          let found=false;
          while(found!==true){
            console.log(rContents.folders[counter]+" == "+rPath[rPath.length-1]);
            if(rContents.folders[counter]==rPath[rPath.length-1]){
                  rContents.folders.splice(counter,1);
                  localStorage.setItem(newPath,JSON.stringify(rContents));
                  found=true;
                  console.log(newPath);
            }else{}
            counter+=1;
            //for testing purposes only, to not get an infinite loop
            //found=true;
          }
      //On future versions sve the location of the folder in the array to know the position of the reference without searching for it
      }
};
localFS.getFileContents=(path,fileName)=>{
      if(path+"#"+fileName!==undefined){
      return localStorage.getItem(path+"#"+fileName);
      }else{
            console.log("File Doesn't exists");
      }
};
//Test the code
//localFS.createFolder("./hello/games");