

// Function to store radio button answers
function storeRadioAnswers() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let experience = document.querySelector('input[name="experience"]:checked')?.value || null;
            // Storing familiar languages
            let languages = document.querySelector('input[name="languages"]:checked')?.value || null;
            // Storing minimum salary expectation
            let salary = document.querySelector('input[name="salary"]:checked')?.value || null;
            // Storing job type preference
            let jobType = document.querySelector('input[name="jobType"]:checked')?.value || null;
            // Storing work environment preference
            let environment = document.querySelector('input[name="environment"]:checked')?.value || null;
            // Storing educational level
            let education = document.querySelector('input[name="education"]:checked')?.value || null;
            // Storing familiar frameworks
            let frameworks = document.querySelector('input[name="frameworks"]:checked')?.value || null;
        
            const db = firebase.firestore();
            const questionnaireRef = db.collection("users").doc(user.uid)
            console.log(questionnaireRef);
            questionnaireRef.set({
                experience: experience,
                languages: languages,
                salary: salary,
                jobType: jobType,
                environment: environment,
                education: education,
                frameworks: frameworks
            })
            
        }
    })

    // Display or use the collected data
    // console.log('Experience:', experience);
    // console.log('Languages:', languages);
    // console.log('Salary:', salary);
    // console.log('Job Type:', jobType);
    // console.log('Environment:', environment);
    // console.log('Education:', education);
    // console.log('Frameworks:', frameworks);



    // Here you can return the data or use it in another way
    // return {
    //     experience,
    //     languages,
    //     salary,
    //     jobType,
    //     environment,
    //     education,
    //     frameworks
    // };
}

// Attach the function to your submit button
document.querySelector('button[type="button"]').addEventListener('click', storeRadioAnswers);
// var currentUser; //points to the document of the user who is logged in

// const db = firebase.firestore();

// // Function to read the quote of the day from the Firestore "quotes" collection
// // Input param is the String representing the day of the week, aka, the document name
// function readQuote(userUID) {
//     db.collection("users").doc(userUID)                                                         //name of the collection and documents should matach excatly with what you have in Firestore
//         .onSnapshot(userUIDDoc => {                                                              //arrow notation
//             console.log("current document data: " + userUIDDoc.data());                          //.data() returns data object
//             document.getElementById("q1").innerHTML = userUIDDoc.data().q1;      //using javascript to display the data on the right place

//             //Here are other ways to access key-value data fields
//             //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
//             //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
//             //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;

//         }, (error) => {
//             console.log ("Error calling onSnapshot", error);
//         });
//     }
//  readQuote("tuesday");        //calling the function

// function populateUserInfo() {
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             currentUser = db.collection("users").doc(user.uid)
//             currentUser.get()
//                 .then(userDoc => {
//                     let userName = userDoc.data().name;
//                     let userEmail = userDoc.data().email;
//                     let userLinkedIn = userDoc.data().linkedin;

//                     if (userName != null) {
//                         document.getElementById("nameInput").value = userName;
//                     }
//                     if (userEmail != null) {
//                         document.getElementById("emailInput").value = userEmail;
//                     }
//                     if (userLinkedIn != null) {
//                         document.getElementById("linkedinInput").value = userLinkedIn;
//                     }
//                 })
//         } else {
//             console.log("No user is signed in");
//         }
//     })
// }

// populateUserInfo();

// function editUserInfo() {
//     document.getElementById('personalInfoFields').disabled = false;
// }

// function saveUserInfo() {
//     userName = document.getElementById("nameInput").value;
//     userSchool = document.getElementById("emailInput").value;
//     userLinkedIn = document.getElementById("linkedinInput").value;
//     currentUser.update({
//         name: userName,
//         school: userEmail,
//         linkedin: userLinkedIn
//     })
//     .then(() => {
//         console.log("Document successfully updated");
//     }
// )}

// document.getElementById("personalInfoFields").disabled = true; 