
window.onload = function getUserData() {
    if (typeof(Storage) !== "undefined") {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');
        getCreatureDatails(
            `http://localhost:8000/creatder/creatures/${id}`,
            "GET",
            "pig_info");
        getCreatureImage(
            `http://localhost:8000/creatder/creatures/${id}/photos/`,
            "GET",
            "pig_image")
    } else {
      alert('You can view creatures until you log in.')
      window.location.href = "login.html"
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
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Authorization", `${user_id}:${token}`);
    xhttp.send();
    console.log(xhttp.responseText);
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
    console.log(xhttp.responseText);
    return xhttp.response;
}

function innerHTMLresponse(ident, json) {
    console.log(json);
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
    console.log(json);
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
    console.log(slides)
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

var myinput = document.querySelector('#image_uploads');
var preview = document.querySelector('.preview');

myinput.style.opacity = 0;
myinput.addEventListener('change', updateImageDisplay);


function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  var curFiles = myinput.files;
  if(curFiles.length === 0) {
    var para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    var list = document.createElement('ol');
    preview.appendChild(list);
    for(var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement('li');
      var para = document.createElement('p');
      if(validFileType(curFiles[i])) {
        para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
        var image = document.createElement('img');
        image.src = window.URL.createObjectURL(curFiles[i]);

        listItem.appendChild(image);
        listItem.appendChild(para);

      } else {
        para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

var fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]

function validFileType(file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

var photo_name = myinput.files;
var the_photo = document.querySelector('#image_uploads').value
// console.log(the_photo)


document.getElementById("submit-btn").addEventListener("click", function(e){
  var params = {
      file: document.querySelector('#image_uploads').files[0],
      creature: id,
  };
  console.log(params)
  var url = `http://localhost:8000/creatder/creatures/${id}/photos/`
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201) {
          console.log(xhr)
          alert('The photo was uploaded.');
        }
        else {
          console.log(xhr.readyState)}
  }
  xhr.send(JSON.stringify(params))
  e.preventDefault()
});
