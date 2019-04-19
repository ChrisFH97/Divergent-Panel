const fs = require('fs');

module.exports = {
 login : function(){

        document.getElementById("errors").style.color = "limegreen";
        document.getElementById("errors").innerHTML = "Attempting login..";

        var user = document.getElementById("uname").value
        var password = document.getElementById("psw").value
        var params = {Username: user,Password: password};
        var data = new FormData();
        for(name in params) {
            data.append(name, params[name]);
          }
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              if(this.responseText == "No rows"){
                  document.getElementById("errors").style.color = "red";
                  document.getElementById("errors").innerHTML = "Missing fields detected";
              }else{
                var json = JSON.parse(this.responseText);
                switch(json.Response){
                    case "Success":
                    var key = json.Key;

                    var content = key;
                    var encoding = "utf8";
                    
                    fs.writeFile('.key.dd', content, encoding, (err) => {
                        if (err) throw err;
                    });

                    window.location.href = "index.html";
                    break;

                    case "Invalid Request":
                    document.getElementById("errors").style.color = "red";
                    document.getElementById("errors").innerHTML = "Something went wrong with you're request.\nPlease try again.";
                    break;

                    case "Invalid login credentials":
                    document.getElementById("errors").style.color = "red";
                    document.getElementById("errors").innerHTML = "Invalid username or password";
                    break;
                }
              }
            
          }
        });
        
        xhr.open("POST", "http://diversitydevelopment.net/divergentdev/API/login.php");
        xhr.setRequestHeader("Cache-Control", "no-cache");
 
        xhr.send(data);

 },fill : function(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var arr = JSON.parse(this.responseText);
        console.log(arr);
        for(var i = 0; i < arr.length; i++){
            var title = arr[i].Title;
            var finish = arr[i]["Expected-Finish"];
            var status = arr[i].Status;
           
            var table = document.getElementById("projects");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = title;
            cell2.innerHTML = finish;
            cell3.innerHTML = status;
            cell4.innerHTML = "<button class=\"button button3\">View</button>";
        }
      }
    });
    
    xhr.open("GET", "http://diversitydevelopment.net/divergentdev/API/GetProject.php?token=e5555a48-1ac9-4f99-a817-17739e026156&id=0");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    
    xhr.send(data);
 }
};
