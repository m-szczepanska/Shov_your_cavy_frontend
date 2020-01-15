document.getElementById('logout_link').addEventListener("click", function(e){
  e.preventDefault();

  var xhttp = new XMLHttpRequest();
  if (localStorage.length !== 0) {
      var user_id = localStorage.getItem("user_id");
      var token = localStorage.getItem("token");
      var pages_count = localStorage.getItem("pages_count");
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('pages_count')
  } else {
    console.log("bad browser no storage")
  }
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 204) {
          alert('You are log out now');
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          window.location.href = "login.html"
      }
  };
  xhttp.open("GET", "http://localhost:8000/creatder/logout", true);
  xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
  xhttp.send();
});
