var currentUser; //points to the document of the user who is logged in 

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().name; 
                    let userEmail = userDoc.data().email; 
                    let userLinkedIn = userDoc.data().linkedin; 

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName; 
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userLinkedIn != null) {
                        document.getElementById("linkedinInput").value = userLinkedIn; 
                    }
                })
        } else {
            console.log("No user is signed in"); 
        }
    })
}

populateUserInfo(); 

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false; 
}

function saveUserInfo() {
    userName = document.getElementById("nameInput").value; 
    userSchool = document.getElementById("emailInput").value; 
    userLinkedIn = document.getElementById("linkedinInput").value; 
    currentUser.update({
        name: userName, 
        school: userEmail,
        linkedin: userLinkedIn
    })
    .then(() => {
        console.log("Document successfully updated");
    }
)}

document.getElementById("personalInfoFields").disabled = true; 