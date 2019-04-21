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

                    var content = "{\"User\" : \"" + user+"\",\"Key\": \""+ key +"\"}";
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
            var finish = arr[i].Expected;
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
 }, projects : function(){
     /*                 <div class="w3-card-4" style="width:25%;margin-left: 15px;">
                        <header class="w3-container w3-red">
                          <h1>Header</h1>
                        </header>
                    
                        <div class="w3-container">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    
                        <footer class="w3-container w3-red">
                          <h5>Footer</h5>
                        </footer>
                </div>
      * 
     */

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var arr = JSON.parse(this.responseText);
        console.log(arr);
        for(var i = 0; i < arr.length; i++){
            var id = arr[i].id;
            var title = arr[i].Title;
            var Description = arr[i].Description;
           
            var projects = document.getElementById("projects");

            var card =  document.createElement("div");
            card.className = "w3-card-4";
            card.style ="width:25%;margin-left: 15px;margin-top: 15px; ";
            

            var header = document.createElement("header");
            header.className = "w3-container w3-red";
            var h3 = document.createElement("p");
            h3.innerText = title;
            h3.style = "color:white;"

            var container =  document.createElement("div");
            container.className = "w3-container";

            var paragraph = document.createElement("p");
            paragraph.innerText = Description;
            paragraph.style = "color:white;"

            var footer = document.createElement("footer");
            footer.className = "w3-container w3-red";
            var button = document.createElement("button");
            button.onclick = "viewProject.html?id=" + id;
            button.innerText = "View Project";

            var br = document.createElement("br");

            header.appendChild(h3);
            card.append(header);
            container.appendChild(paragraph);
            card.appendChild(container);
            footer.appendChild(button);
            card.appendChild(footer);
            projects.appendChild(card);
            projects.appendChild(br);





        }
      }
    });
    
    xhr.open("GET", "http://diversitydevelopment.net/divergentdev/API/GetProject.php?token=e5555a48-1ac9-4f99-a817-17739e026156&id=0");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    
    xhr.send(data);

 }
};
