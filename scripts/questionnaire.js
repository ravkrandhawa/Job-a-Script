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
            }, {merge: true}).then(() => {
                //Once the user hits submit, it will save the questionnaire details to firestore while also re-routing the user to the display_results.html page
                window.location.href = "display_results.html"; 
                //If there is an error with this re-routing, it will console log the error 
            }).catch(error => {
                console.error("Error saving data: ", error); 
            })
            
        }
    })

}

// Attach the function to your submit button
document.querySelector('button[type="button"]').addEventListener('click', storeRadioAnswers);
