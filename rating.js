
window.onload = function getUserData() {
    if (typeof(Storage) !== "undefined") {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
    } else {
      alert('You can rate creatures until you log in.')
      window.location.href = "login.html"
    }
}


document.getElementById("rate-btn").addEventListener("click", function(e){
  var params = {
      user_id: user_id,
      rating: document.getElementById('inputRating').value,
      comment: document.getElementById('inputComment').value,
  };
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get('id');
  var url = `http://localhost:8000/creatder/creatures/${id}/rate_creature`
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          console.log(xhr)
          alert('Your rate was submitted.');
        }
        else {
          console.log(xhr.readyState)}
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
