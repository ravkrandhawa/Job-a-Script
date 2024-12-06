var currentUser; //points to the document of the user who is logged in 

// This function reads the values of the fields in the user uid document and
// attaches those values onto ID's for the page to recongnize.
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

// Allows user to than interact with the fields when they click the edit button
function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

// This function is called upon clicking the save button.
// It gets the values that the user entered in that html id and
// updates the values in the firestore fields.
function saveUserInfo() {
    userName = document.getElementById("nameInput").value;
    userEmail = document.getElementById("emailInput").value;
    userLinkedIn = document.getElementById("linkedinInput").value;
    currentUser.update({
        name: userName,
        email: userEmail,
        linkedin: userLinkedIn
    })
        .then(() => {
            swal({
                title: "Edits saved!",
                text: "Your edits have been sucessfully saved.",
                type: "success",
                confirmButtonColor: "#25446a"  // Second alert confirm button color
            });
            console.log("Document successfully updated");
        }
        )
}

document.getElementById("personalInfoFields").disabled = true;