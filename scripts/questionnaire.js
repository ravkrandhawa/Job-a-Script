

// Function to store radio button answers
function storeRadioAnswers() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let experience = document.querySelector('input[name="experience"]:checked')?.value || "";
            // Storing familiar languages
            let languagesA = document.querySelector('input[name="languagesA"]:checked')?.value || "";
            let languagesB = document.querySelector('input[name="languagesB"]:checked')?.value || "";
            let languagesC = document.querySelector('input[name="languagesC"]:checked')?.value || "";
            let languagesD = document.querySelector('input[name="languagesD"]:checked')?.value || "";
            let languagesE = document.querySelector('input[name="languagesE"]:checked')?.value || "";
            let languagesF = document.querySelector('input[name="languagesF"]:checked')?.value || "";
            let languagesG = document.querySelector('input[name="languagesG"]:checked')?.value || "";
            // Storing minimum salary expectation
            let salary = document.querySelector('input[name="salary"]:checked')?.value || "";
            // Storing job type preference
            let fullTime = document.querySelector('input[name="full-time"]:checked')?.value || "";
            let partTime = document.querySelector('input[name="part-time"]:checked')?.value || "";
            let contract = document.querySelector('input[name="contract"]:checked')?.value || "";
            // Storing work environment preference
            let remote = document.querySelector('input[name="remote"]:checked')?.value || "";
            let hybrid = document.querySelector('input[name="hybrid"]:checked')?.value || "";
            let inPerson = document.querySelector('input[name="inPerson"]:checked')?.value || "";
            // Storing educational level
            let education = document.querySelector('input[name="education"]:checked')?.value || "";
            // Storing familiar frameworks
            let aws = document.querySelector('input[name="AWS"]:checked')?.value || "";
            let ajax = document.querySelector('input[name="AJAX"]:checked')?.value || "";
            let angular = document.querySelector('input[name="Angular"]:checked')?.value || "";
            let bootstrap = document.querySelector('input[name="Bootstrap"]:checked')?.value || "";
            let blazor = document.querySelector('input[name="Blazor"]:checked')?.value || "";
            let playFramework = document.querySelector('input[name="playFramework"]:checked')?.value || "";
            let others = document.querySelector('input[name="Others"]:checked')?.value || "";

        
            const db = firebase.firestore();
            const questionnaireRef = db.collection("users").doc(user.uid)
            console.log(questionnaireRef);
            questionnaireRef.set({
                experience: experience,
                languages: languagesA + " " + languagesB + " " + languagesC + " " + languagesD + " " + languagesE + " " + languagesF + " " + languagesG,
                salary: salary,
                jobType: fullTime + " " + partTime + " " + contract,
                environment: remote + " " + hybrid + " " + inPerson,
                education: education,
                frameworks: aws + " " + ajax + " " + angular + " " + bootstrap + " " + blazor + " " + playFramework + " " + others
            }, {merge: true})
            
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