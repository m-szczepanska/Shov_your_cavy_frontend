function delPig(pig_id) {
    if (localStorage.length !== 0) {
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
    } else {
      console.log("You can't delete this pig")
    }

    if (window.confirm("Do you really want to delete this pig?")) {

        var url = `http://127.0.0.1:8000/creatder/creatures/${pig_id}`;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Authorization", `${user_id}:${token}`);

        xhr.onload = function () {
        	var responseInfo = JSON.parse(xhr.responseText);
        	if (xhr.readyState == 4 && xhr.status == "200") {
                alert("Bye, pig!")
        		window.location.href = "login.html"
        	} else {
        		console.error(responseInfo);
        	}
        }
        xhr.send();
    }
};
