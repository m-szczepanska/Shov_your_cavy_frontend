
window.onload = function getUserData() {
    if (localStorage.user_id) {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');
        getCreatureDatails(
            `http://127.0.0.1:8000/creatder/creatures/${id}`,
            "GET",
            "formAjax");
        getCreatureImage(
            `http://127.0.0.1:8000/creatder/creatures/${id}/photos/`,
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
    if (json["crossed_rainbow_bridge"] == true) {
        var crb = "False";
        var selec_val="True"}
    else {
        var crb = "True";
        var selec_val="False"}

    element.innerHTML +=
    `
    <div class="form-group">
        <label class="sr-only" for="inputName" >Name</label>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">Name</div>
            </div>
            <input type="name" id="inputName" class="form-control" value=${json["name"]} >
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col">
        <label for="inputAge" class="sr-only">Age</label>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">Age</div>
            </div>
          <input type="number" id="inputAge" class="form-control" value=${json["age"]} >
        </div>
      </div>
        <div class="form-group col">
            <label for="inputSex" class="sr-only">Sex</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">Sex</div>
                </div>
            <select id="inputSex" class="form-control">
              <option value=${json["sex"]} disabled selected>${json["sex"]}</option>
              <option value="Not sure">Not sure</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
        </div>
      </div>
    </div>
      <div class="form-group">
        <label class="sr-only" for="inputBreed">Breed</label>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">Breed</div>
            </div>
            <select id="inputBreed" class="form-control" >
                <option value=${json["breed"]} disabled selected>${json["breed"]}</option>
                <option value="Other">Other</option>
                <option value="Abyssinian">Abyssinian</option>
                <option value="American">American</option>
                <option value="Hairless">Hairless</option>
                <option value="Himalayan">Himalayan</option>
                <option value="Rex">Rex</option>
                <option value="Silkie">Silkie</option>
                <option value="Teddy">Teddy</option>
                <option value="White-crested">White-crested</option>
            </select>
        </div>
      </div>
      <div class="form-group">
          <label class="sr-only" for="inputColorPattern">Color pattern</label>
          <div class="input-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">Color Pattern</div>
              </div>
              <select id="inputColorPattern" class="form-control">
                <option value=${json["color_pattern"]} disabled selected>${json["color_pattern"]}</option>
                <option value="Agouti-Chocolate">Agouti-Chocolate</option>
                <option value="Agouti-Cream">Agouti-Cream</option>
                <option value="Agouti-Golden">Agouti-Golden</option>
                <option value="Agouti-Silver">Agouti-Silver</option>
                <option value="Albino">Albino</option>
                <option value="Brindle">Brindle</option>
                <option value="Mix">Mix</option>
                <option value="Self-Black">Self-Black</option>
                <option value="Self-White">Self-White</option>
                <option value="Self-Red">Self-Red</option>
                <option value="Red-black">Red-black</option>
                <option value="White-black">White-black</option>
                <option value="White-cream">White-cream</option>
                <option value="White-red">White-red</option>
              </select>
          </div>
      </div>
      <div class="form-row">
          <label class="sr-only" for="inputCrossedRainbowBridge">Crossed Rainbow Bridge</label>
          <div class="input-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">Crossed Rainbow Bridge</div>
              </div>
              <select id="inputCrossedRainbowBridge" class="form-control mb-1">
                <option selected="selected" value=${selec_val}>${selec_val}</option>
                <option value=${crb}>${crb}</option>
              </select>
          </div>
      </div>

      <button class="btn-pig-info-submit btn-block" type="submit">Submit changes</button>`
    }


function multiplyDiv(ident, count, json) {
    console.log(json);
    var element = document.getElementById(ident);
    for (var i=0; i<count; i++)
        element.innerHTML +=
            `<div class="slideshow-container">
                <div class="mySlides">
                <img class="rate-photo" src="/Users/marsza/workspace${json[i]["file"]}", id="${json[i]["id"]}" alt="swinia">
            </div>`
    showSlides(slideIndex);
};

var slideIndex = 1;

function plusSlides(n) {showSlides(slideIndex += n);}

function currentSlide(n) {showSlides(slideIndex = n);}

function delPigImage() {
    if (localStorage.pig_image_id) {
        pig_image_id = localStorage.getItem("pig_image_id");

    } else {
          console.log("You can't delete this photo")
    }

    if (window.confirm("Do you really want to delete this photo?")) {
        urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('id');
        console.log('THE PIG', pig_image_id);
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", `http://127.0.0.1:8000/creatder/creatures/${id}/photos/${pig_image_id}/`, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 204 || xhr.readyState == 4 && xhr.status == 200) {
                alert('Photo deleted');

                location.reload()
            } else {
        		console.log('something wrong');
        	}
        }
        xhr.send();
    }
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("rate-photo");
    // slides.innerHTML += `<a class="remove-image" href="#" style="display: inline;">&#215;</a>`

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";

    var pig_image_id = `${slides[slideIndex-1].id}`;
    localStorage.setItem("pig_image_id", pig_image_id)
}

// Upload photo

var myinput = document.querySelector('#file');
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
      if(curFiles[i]) {
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

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}


var form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', function(e) {

  var result = document.querySelector("#result"),
      input_data = new FormData(form);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", `http://127.0.0.1:8000/creatder/creatures/${id}/photos/`, true);
  xhr.onload = function(oEvent) {
    if (xhr.status == 201) {
      alert("Uploaded!");
      window.location.href = `upload_photo.html?id=${id}`
    } else {
      alert("Error " + xhr.status + " occurred when trying to upload your file.<br \/>");
    }
  };

  xhr.send(input_data);
  e.preventDefault();
}, false);


document.querySelector('#formAjax').addEventListener("submit", function(e){
  e.preventDefault();

  var xhr = new XMLHttpRequest()
  // xhr.withCredentials = true;
  urlParams = new URLSearchParams(window.location.search);
  var pig_id = urlParams.get('id');

  var url = `http://127.0.0.1:8000/creatder/creatures/${pig_id}/`

  var params = {
      name: document.querySelector('#inputName').value,
      age: document.querySelector('#inputAge').value,
      sex: document.querySelector('#inputSex').value,
      breed: document.querySelector('#inputBreed').value,
      color_pattern: document.querySelector('#inputColorPattern').value,
      crossed_rainbow_bridge: document.querySelector('#inputCrossedRainbowBridge').value
  };

  xhr.open('PUT', url, true)
  var auth_cred = `${user_id}:${token}`
  xhr.setRequestHeader('Authorization', auth_cred)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 201 || xhr.readyState == 4 && xhr.status == 200) {
          alert('Changes submitted');
          location.reload();

      }
      else if (xhr.readyState == 4 && xhr.status !== 201 || xhr.readyState == 4 && xhr.status !== 200) {
          // window.location.href = `error_page.html?=${this.status}`
          console.log(xhr.response)
      }
  }
  xhr.send(JSON.stringify(params))

});
