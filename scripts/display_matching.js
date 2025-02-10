// Function to parse user data into words for matching. It splits each value if there is a space.
function parseUserData(userInfo) {
    const parsedData = {};
    for (let key in userInfo) {
        parsedData[key] = userInfo[key].split(/\s+/).filter(Boolean);
    }
    return parsedData;
}

// Function to calculate the match score of each job listing.
// This function allows us to sort the jobs that fit the user's answers the best.
function calculateMatchScore(parsedUserData, doc) {
    let matchCount = 0;
    // Every time the words from parsedUserKey is seen in the job listings, the matchCount is incremented.
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

// Function to retrieve user data, parse it, and pass to fetchAndDisplayJobs.
// We trim the jobs so the spaces we added earlier are removed from outside the string.
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
                    //Splits the trimmed data's empty spaces in between each word.
                    const parsedUserData = parseUserData(userInfo);
                    // Fetches the jobs using the data and sorts it by highest match score first.
                    fetchAndDisplayJobs(parsedUserData);
                })
                .catch(error => console.error("Error retrieving user data:", error));
        } else {
            console.log("No user is signed in");
        }
    });
}

// Function to fetch job data, calculate match scores, sort, and display job listings
// It uses the fetch api built into javascript to access the data from the server we
// are loading all the information from.
function fetchAndDisplayJobs(parsedUserData) {
    fetch("https://job-a-script-production.up.railway.app/")
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

// Function to display job listings in the HTML content div. It gets all the information
// from the fetched data and prints them as a string.
function displayListings(listingsWithScores) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "";

    listingsWithScores.forEach(item => {
        const doc = item.listing;
        const matchScore = item.matchScore;

        // Match score colorization to give a visual impact to our users
        let matchScoreColor; 
        if (matchScore >= 7) {
            matchScoreColor = 'green'; 
        } else if (matchScore >= 5) {
            matchScoreColor = '#edbc40;'
        } else {
            matchScoreColor = 'red'; 
        }

        // Prints the cards on the screen using html tags and aslo makes it unique using a loop system
        let jobCard = document.createElement("div");
        jobCard.innerHTML = `
            <div class="col-md-4 mb-4" style="border: solid; border-radius: 10px; border-color: lightgrey">
                <div id="${doc.job_id}" class="card h-100">
                    <img id="${doc.thumbnail}" src="${doc.thumbnail || './images/default-thumbnail.png'}" class="card-img-top" alt="${doc.title}">
                    <div class="card-body">
                        <h5 id="${doc.title}" class="card-title">${doc.title}</h5>
                        <p id="${doc.company_name}" class="card-text"><strong>Company:</strong> ${doc.company_name}</p>
                        <p id="${doc.location}" class="card-text"><strong>Location:</strong> ${doc.location}</p>
                        <p id="${matchScore}" class="card-text"><strong>Match Score:</strong><span style="color: ${matchScoreColor};"> ${matchScore} (out of 10)</span></p>
                        <a id="${doc.share_link}" href="${doc.share_link}" target="_blank">Apply Now</a>
                        <i id="${doc.company_name}" class="material-icons float-end ${doc.job_id}">bookmark_border</i>
                    </div>
                </div>
            </div>
        `;


        contentDiv.appendChild(jobCard);

        console.log(`#${doc.job_id}` + " doc ID")
        // Attach event listener to the bookmark icon
        // Checks if the job is bookmarked already. If bookmarked, change bookmark icon to filled in.
        let bookmarksRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("bookmarks");
        bookmarksRef.doc(doc.job_id).get().then(docSnapshot => {
            if (docSnapshot.exists) {
                jobCard.getElementsByTagName("i")[0].innerHTML = "bookmark";
            }
        });

        // This adds an even listener to the i tags in the job cards
        jobCard.querySelector('i').onclick = () => {
            bookmarkCollection(doc, matchScore);
        };

    });
}

// Run the userDataToArray function to start.
userDataToArray();

// This function adds that job card and all the information from it to 
// a firestore subcollection called bookmarks which is located in the users uid document.
// This information has to stored in firestore since the jobs are taken from a api that refreshs
// after a certain amount of time. This function is accessed through an event listener.
function bookmarkCollection(doc, matchScore) {
    firebase.auth().onAuthStateChanged(user => {
        console.log("Authentication")
        if (user) {
            
            console.log(doc)
            let thumbnail = doc.thumbnail;

            console.log(db.collection("users").doc(user.uid));

            console.log(thumbnail);

            if (thumbnail == undefined) {
                thumbnail = './images/default-thumbnail.png';
            }

            console.log(thumbnail);


            //extract details of "THE job"
            var theJob = {
                thumbnail: thumbnail,
                job_id: doc.job_id,
                title: doc.title,
                company_name: doc.company_name,
                share_link: doc.share_link,
                location: doc.location,
                matchScore: matchScore,
                description: doc.description
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