

module.exports = {
 login : function(){
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
                  alert("Username or Password missing");
              }else{
                var json = JSON.parse(this.responseText);
                switch(json.Response){
                    case "Success":
                    window.location.href = "index.html";
                    break;

                    case "Invalid Request":
                    alert("Something went wrong with you're request.\nPlease try again.");
                    break;

                    case "Invalid login credentials":
                    alert("Login credentials invalid.");
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
