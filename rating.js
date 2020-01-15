
window.onload = function getUserData() {
    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');
        getCreatureDatails(
            `http://localhost:8000/creatder/creatures/${id}/`,
            "GET",
            "pig_info");
        getCreatureImage(
            `http://localhost:8000/creatder/creatures/${id}/photos/`,
            "GET",
            "pig_image")
    }
}

function getCreatureDatails(url, method, ident) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            innerHTMLresponse(ident, parsed);
        }
        else if (this.readyState == 4 && this.status !== 200) {
            window.location.href = `error_page.html?=${this.status}`
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    return xhttp.response;
}

function getCreatureImage(url, method, ident) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        // readyState == 4 - response fully received
        if (this.readyState == 4 && this.status == 200) {
            var parsed = JSON.parse(this.response);
            multiplyDiv(ident, parsed.length, parsed);
        }
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    return xhttp.response;
}

function innerHTMLresponse(ident, json) {
    var element = document.getElementById(ident);
      element.innerHTML += `
            <div class="row">
                Name: ${json["name"]}
            </div>
            <div class="row">
                Age: ${json["age"]}
            </div>
            <div class="row">
                Sex: ${json["sex"]}
            </div>
            <div class="row">
                Breed: ${json["breed"]}
            </div>
            <div class="row">
                Color pattern: ${json["color_pattern"]}
            </div>
            <div class="row">
                Crossed rainbow bridge: ${json["crossed_rainbow_bridge"]}
            </div>
            <div class="row">
                Average rating: ${json["average_rating"]}
            </div>
            <div class="row">
                Owner: ${json["owner"]["login"]}
            </div>`
}

function multiplyDiv(ident, count, json) {
    var element = document.getElementById(ident);
    for (var i=0; i<count; i++)
        element.innerHTML +=
            `<div class="slideshow-container">
                <div class="mySlides">
                <img class="rate-photo" src="/Users/marsza/workspace${json[i]["file"]}" alt="swinia">
            </div>`
    showSlides(slideIndex);
};

var slideIndex = 1;

function plusSlides(n) {showSlides(slideIndex += n);}

function currentSlide(n) {showSlides(slideIndex = n);}

function showSlides(n, count) {
    var i;
    var slides = document.getElementsByClassName("rate-photo");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}


document.getElementById("rate-btn").addEventListener("click", function(e){
  var params = {
      user_id: user_id,
      rating: document.getElementById('inputRating').value,
      comment: document.getElementById('inputComment').value,
  };
  var url = `http://localhost:8000/creatder/creatures/${id}/rate_creature/`
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  var auth_cred = `${user_id}:${token}`
  xhr.setRequestHeader('Authorization', auth_cred)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          alert('Your rate was submitted.');
          location.reload();
        }
        else {
          console.log(xhr.readyState)}
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
