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
    userEmail = document.getElementById("emailInput").value;
    userLinkedIn = document.getElementById("linkedinInput").value;
    currentUser.update({
        name: userName,
        email: userEmail,
        linkedin: userLinkedIn
    })
        .then(() => {
            console.log("Document successfully updated");
        }
        )
}

document.getElementById("personalInfoFields").disabled = true;

function userDataToArray() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    // let userEducation = userDoc.data().education.trim();
                    // let userEnvironment = userDoc.data().environment.trim();
                    // let userExperience = userDoc.data().experience.trim();
                    // let userFrameworks = userDoc.data().frameworks.trim();
                    // let userJobType = userDoc.data().jobType.trim().toLowerCase();
                    // let userLanguages = userDoc.data().languages.trim();
                    // let userSalary = userDoc.data().salary.trim();
                    

                    const userInfo = {
                        userEducation : userDoc.data().education.trim(),
                        userEnvironment : userDoc.data().environment.trim(),
                        userExperience : userDoc.data().experience.trim(),
                        userFrameworks : userDoc.data().frameworks.trim(),
                        userJobType : userDoc.data().jobType.trim().toLowerCase(),
                        userLanguages : userDoc.data().languages.trim(),
                        userSalary : userDoc.data().salary.trim()
                    };

                    // Function to split each field's value into words
function parseUserData(data) {
    const parsedData = {};

    for (let key in data) {
        // Split each string by spaces and filter out any empty strings
        parsedData[key] = data[key].split(/\s+/).filter(Boolean);
    }

    return parsedData;
}

// Parse the data
const parsedUserData = parseUserData(userInfo);
console.log(parsedUserData);
// Function to split each field's value into words
function parseUserData(data) {
    const parsedData = {};

    for (let key in data) {
        // Split each string by spaces and filter out any empty strings
        parsedData[key] = data[key].split(/\s+/).filter(Boolean);
    }

    return parsedData;
}
                    
                    // let userInfo = ["SAP", "SQL Developer Intern", userEducation, userEnvironment, userExperience, userFrameworks, userJobType, userLanguages, userSalary];
                    console.log(userInfo);
                    fetch('http://127.0.0.1:8000')
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data); // Logs the data to the console
            
                        // const contentDiv = document.getElementById('content');
    
                        let frequency = 0;
                        data.forEach(doc => {
                            if (isMatch(userInfo, doc)) {
                                frequency++; 
                            }
                            company_name.push(doc.company_name);

                            parseUserData(userInfo); 
                            // salary.add();
            
                            // if (doc.company_name === userInfo[0]) {
                            //     frequency++;
                            // }

                            // if (doc.title === userInfo[1]) {
                            //     frequency++; 
                            // }
            
                            // message = message + "<div class=" + "card>" + "<img src=" + doc.thumbnail + "<p>" + "<span class=" + "job-title>"
                            //     + doc.title + "</span>" +
                            //     doc.company_name + "<br/>" + "<a href=" + doc.share_link
                            //     + ">Apply Now!</a>" + "<i id=" + doc.company_name + " class=\"material-icons\">bookmark_border</i>" + "</p></div><br/>";
                        })
            
                        console.log(frequency);
            
                        // Display the final string which includes all the jobs
                        // contentDiv.innerHTML = message;
                    })
                    

                })

        } else {
            console.log("No user data detected");
        }
    })
}

// Function to split each field's value into words
function parseUserData(data) {
    const parsedData = {};

    for (let key in data) {
        // Split each string by spaces and filter out any empty strings
        parsedData[key] = data[key].split(/\s+/).filter(Boolean);
    }

    return parsedData;
}

// Parse the data
const parsedUserData = parseUserData(userInfo);
console.log(parsedUserData);
// Function to split each field's value into words
function parseUserData(data) {
    const parsedData = {};

    for (let key in data) {
        // Split each string by spaces and filter out any empty strings
        parsedData[key] = data[key].split(/\s+/).filter(Boolean);
    }

    return parsedData;
}



userDataToArray();
function fetchJobs() {
    fetch('http://127.0.0.1:8000')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Logs the data to the console

            const contentDiv = document.getElementById('content');

            let company_name = [];
            let salary = [];
            data.forEach(doc => {
                company_name.push(doc.company_name);
                // salary.add();

                let frequency = 0;
                if (company_name.contains(userInfo[0])) {
                    frequency++;
                }

                // message = message + "<div class=" + "card>" + "<img src=" + doc.thumbnail + "<p>" + "<span class=" + "job-title>"
                //     + doc.title + "</span>" +
                //     doc.company_name + "<br/>" + "<a href=" + doc.share_link
                //     + ">Apply Now!</a>" + "<i id=" + doc.company_name + " class=\"material-icons\">bookmark_border</i>" + "</p></div><br/>";
            })

            console.log(frequency);

            // Display the final string which includes all the jobs
            contentDiv.innerHTML = message;
        })
        .catch(error => console.error('Error fetching data:', error));
}
// fetchJobs();