window.onload = function getUserData() {

    if (localStorage.length !== 0) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
    } else {
      alert('You can\'t add creatures until you log in.')
      window.location.href = "login.html"
    }
}

document.querySelector('#formAjax').addEventListener("submit", function(e){
  e.preventDefault();

  var xhr = new XMLHttpRequest()

  var url = `http://localhost:8000/creatder/users/${user_id}/add_creature/`
  var params = {
      name: document.querySelector('#inputName').value,
      age: document.querySelector('#inputAge').value,
      sex: document.querySelector('#inputSex').value,
      breed: document.querySelector('#inputBreed').value,
      color_pattern: document.querySelector('#inputColorPattern').value,
      crossed_rainbow_bridge: document.querySelector('#inputCrossedRainbowBridge').value,
      owner: user_id
  };

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('The pig was added');
          console.log(xhr.responseText)
          window.location.href = "file:///Users/marsza/workspace/zwierzu_front/add_pig.html"
      }
  }
  xhr.send(JSON.stringify(params))

});
