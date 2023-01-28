console.log(firebase.auth())

var email = document.getElementById("email")
var password = document.getElementById("password")
var name1  = document.getElementById("name")
var signup  = document.getElementById("signup")
var signin  = document.getElementById("signin")
var role = document.getElementsByName("user")
var getrole = ""

signup.addEventListener("click", function () {
    console.log(email.value);
    console.log(password.value);
    for (var i = 0; i < role.length; i++) {
        if (role[i].checked) { 
            var getrole = role[i].value;
            break;
        }
    }
    if (getrole == ""){
        alert("select role");
    } else {
        console.log(getrole);
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
.then(async (userdata) => {
    console.log(userdata.user.uid);
    var obj = {
        username: name1.value,
        email: email.value,
        password: password.value,
        role: getrole,
        USER_UID: userdata.user.uid
    }
    await firebase.database().ref(`${getrole.toString()}/`).child(userdata.user.uid).set(obj);
    alert("User Registered");
})
.catch(error => {
    alert(error);
});

    }
});


signin.addEventListener("click", function () {
    console.log(email.value);
    console.log(password.value);

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userdata) =>{
        console.log(userdata.user.uid);
        firebase.database().ref("Admin/").child(userdata.user.uid)
        .once("value",(snap) =>{
            console.log(snap.toJSON());
            if (snap.toJSON()==null){
                firebase.database().ref("user/").child(userdata.user.uid).once("value", (snap) => {
                    console.log(snap.toJSON());
                    window.location.replace("user_panel.html");
                    
                });
            }
            else{
                window.location.replace("admin_panel.html");
            }
        })
    })
    .catch((error) => {
        console.log(error);
    });
});