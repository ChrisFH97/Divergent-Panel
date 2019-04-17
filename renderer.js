

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

 }
};
