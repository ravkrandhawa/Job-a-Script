var currentUser;

function userDataToArray() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    let userEducation = userDoc.data().education.trim(); 
                    let userEnvironment = userDoc.data().environment.trim(); 
                    let userExperience = userDoc.data().experience.trim(); 
                    let userFrameworks = userDoc.data().frameworks.trim();
                    let userJobType = userDoc.data().jobType.trim();
                    let userLanguages = userDoc.data().languages.trim();
                    let userSalary = userDoc.data().salary.trim();


                    let userInfo = [userEducation, userEnvironment, userExperience, userFrameworks, userJobType, userLanguages, userSalary];
                    console.log(userInfo);
                })
                
        } else {
            console.log("No user data detected"); 
        }
    })
}

userDataToArray(); 