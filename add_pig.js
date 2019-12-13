window.onload = function getUserData() {

    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
    } else {
      alert('You can\'t add creatures until you log in.')
    }
}

document.querySelector('#formAjax').addEventListener("submit", function(e){
  e.preventDefault();

  var xhr = new XMLHttpRequest()
  // xhr.withCredentials = true;

  var url = `http://localhost:8000/creatder/users/${user_id}/add_creature/`
  console.log(user_id);
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
  var auth_cred = `${user_id}:${token}`
  xhr.setRequestHeader('Authorization', auth_cred)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('The pig was added');
          console.log(xhr.responseText)
          window.location.href = "file:///Users/marsza/workspace/zwierzu_front/user_piggies.html"
      }
      else if (xhr.readyState == 4 && xhr.status !== 201) {
          // window.location.href = `error_page.html?=${this.status}`
          console.log(xhr.response)
      }
  }
  xhr.send(JSON.stringify(params))

});
