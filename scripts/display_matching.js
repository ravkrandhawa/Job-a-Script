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
        let jobCard = document.createElement("div");
        jobCard.innerHTML = `
            <div class="col-md-4 mb-4" style="border: solid; border-radius: 10px; border-color: lightgrey">
                <div id="${doc.job_id}" class="card h-100">
                    <img id="${doc.thumbnail}" src="${doc.thumbnail || './images/default-thumbnail.png'}" class="card-img-top" alt="${doc.title}">
                    <div class="card-body">
                        <h5 id="${doc.title}" class="card-title">${doc.title}</h5>
                        <p id="${doc.company_name}" class="card-text"><strong>Company:</strong> ${doc.company_name}</p>
                        <p class="card-text"><strong>Location:</strong> ${doc.location}</p>
                        <p class="card-text">${doc.description ? doc.description.substring(0, 100) + '...' : ''}</p>
                        <p class="card-text"><strong>Match Score:</strong> ${matchScore}</p>
                        <a id="${doc.share_link}" href="${doc.share_link}" target="_blank" class="btn btn-primary">Apply Now</a>
                        <i id="${doc.company_name}" class="material-icons float-end ${doc.job_id}">bookmark_border</i>
                    </div>
                </div>
            </div>
        `;


        contentDiv.appendChild(jobCard);

        console.log(`#${doc.job_id}` + " doc ID")
        // Attach event listener to the bookmark icon
        
        let bookmarksRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("bookmarks");
        bookmarksRef.doc(doc.job_id).get().then(docSnapshot => {
            if (docSnapshot.exists) {
                jobCard.getElementsByTagName("i")[0].innerHTML = "bookmark";
            }
        });

        jobCard.querySelector('i').onclick = () => {
            // add if statement
            bookmarkCollection(doc);
        };

    });
}

// Run the userDataToArray function to start the process
userDataToArray();

function bookmarkCollection(doc) {
    firebase.auth().onAuthStateChanged(user => {
        console.log("Authentication")
        if (user) {
            // This are variables to get the id data that should be stored in firestore
            // let thumbnail = document.querySelector('#${doc.thumbnail}');
            console.log(doc)
            let title = doc.title;
            console.log(title);
            // let companyName = document.querySelector('#${doc.company_name}');
            // let shareLink = document.querySelector('#${doc.share_link}');

            console.log(db.collection("users").doc(user.uid));

            //extract details of "THE job"
            var theJob = {
                job_id: doc.job_id,
                // thumbnail: doc.thumbnail,
                title: doc.title,
                company_name: doc.company_name,
                share_link: doc.share_link

            }

            // Reference to the user's subcollection "bookmarks"
            let bookmarksRef = db.collection("users").doc(user.uid).collection("bookmarks");

            // Add the job to the "bookmarks" subcollection
            const bookmarkIcon = document.getElementById(`${doc.job_id}`);

            bookmarksRef.doc(theJob.job_id).get().then(docSnapshot => {
                console.log("Thingy is the not working.");
                if (!docSnapshot.exists) {
                    bookmarksRef.doc(theJob.job_id).set(theJob)
                    .then(() => {
                        console.log("Bookmark added successfully!");
                    })
                    .catch(error => {
                        console.log("hi arshypoo0")
                    });

                console.log(`#${doc.job_id}` + " doc ID")
                // Attach event listener to the bookmark icon

                console.log(bookmarkIcon);
                bookmarkIcon.getElementsByClassName(doc.job_id)[0].innerHTML = 'bookmark';
            } else {
                console.log("The bookmark is getting deleted.");
                bookmarksRef.doc(theJob.job_id).delete();
                
                bookmarkIcon.getElementsByClassName(doc.job_id)[0].innerHTML = 'bookmark_border';
            }
            });

        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}