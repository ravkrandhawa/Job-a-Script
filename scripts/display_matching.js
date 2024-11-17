// Function to parse user data into words for matching
function parseUserData(userInfo) {
    const parsedData = {};
    for (let key in userInfo) {
        parsedData[key] = userInfo[key].split(/\s+/).filter(Boolean);
    }
    return parsedData;
}

// Function to calculate the match score of each job listing
function calculateMatchScore(parsedUserData, doc) {
    let matchCount = 0;

    for (let key in parsedUserData) {
        parsedUserData[key].forEach(word => {
            if (
                (doc.description && doc.description.toLowerCase().includes(word)) ||
                (doc.title && doc.title.toLowerCase().includes(word)) ||
                (doc.company_name && doc.company_name.toLowerCase().includes(word)) ||
                (doc.location && doc.location.toLowerCase().includes(word)) ||
                (doc.detected_extensions && doc.detected_extensions.schedule_type && doc.detected_extensions.schedule_type.toLowerCase().includes(word)) ||
                (doc.detected_extensions && doc.detected_extensions.qualifications && doc.detected_extensions.qualifications.toLowerCase().includes(word))
            ) {
                matchCount++;
            }
        });
    }

    return matchCount;
}

// Function to retrieve user data, parse it, and pass to fetchAndDisplayJobs
function userDataToArray() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    const userInfo = {
                        education: userDoc.data().education.trim(),
                        environment: userDoc.data().environment.trim(),
                        experience: userDoc.data().experience.trim(),
                        frameworks: userDoc.data().frameworks.trim(),
                        jobType: userDoc.data().jobType.trim().toLowerCase(),
                        languages: userDoc.data().languages.trim(),
                        salary: userDoc.data().salary.trim()
                    };

                    const parsedUserData = parseUserData(userInfo);
                    fetchAndDisplayJobs(parsedUserData);
                })
                .catch(error => console.error("Error retrieving user data:", error));
        } else {
            console.log("No user is signed in");
        }
    });
}

// Function to fetch job data, calculate match scores, sort, and display job listings
function fetchAndDisplayJobs(parsedUserData) {
    fetch('http://127.0.0.1:8000')
        .then(response => response.json())
        .then(data => {
            let listingsWithScores = data.map(doc => {
                return {
                    listing: doc,
                    matchScore: calculateMatchScore(parsedUserData, doc)
                };
            });

            listingsWithScores.sort((a, b) => b.matchScore - a.matchScore);

            displayListings(listingsWithScores);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display job listings in the HTML content div
function displayListings(listingsWithScores) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "";

    listingsWithScores.forEach(item => {
        const doc = item.listing;
        const matchScore = item.matchScore;

        const jobCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${doc.thumbnail || './images/default-thumbnail.png'}" class="card-img-top" alt="${doc.title}">
                    <div class="card-body">
                        <h5 class="card-title">${doc.title}</h5>
                        <p class="card-text"><strong>Company:</strong> ${doc.company_name}</p>
                        <p class="card-text"><strong>Location:</strong> ${doc.location}</p>
                        <p class="card-text">${doc.description ? doc.description.substring(0, 100) + '...' : ''}</p>
                        <p class="card-text"><strong>Match Score:</strong> ${matchScore}</p>
                        <a href="${doc.share_link}" target="_blank" class="btn btn-primary">Apply Now</a>
                        <i id="${doc.company_name}" class="material-icons float-end">bookmark_border</i>
                    </div>
                </div>
            </div>
        `;

        contentDiv.innerHTML += jobCard;
    });
}

// Run the userDataToArray function to start the process
userDataToArray();
