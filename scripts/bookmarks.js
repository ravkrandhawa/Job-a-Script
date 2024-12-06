//Function that calls everything needed for the main page 
// This way we don't have to call a bunch of functions and can instead do it all
// in one step. This is faster for the system. 
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid).collection("bookmarks"); //global
            console.log(currentUser);

            displaySaved(currentUser);
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

// Function to display job listings in the HTML content div. This is done by getting
// the firestore subcollection from the users uid document. These values are than attached
// to variables which are than displyed onto the screen very similarly to the display_results page.
function displaySaved(bookmarksCollection) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "";

    bookmarksCollection.get().then(allBookmarks => {
        allBookmarks.forEach(doc => {

            // Values taken from firestore fields
            var title = doc.data().title;
            var companyName = doc.data().company_name;
            var shareLink = doc.data().share_link;
            var jobId = doc.data().job_id;
            var location = doc.data().location;
            var matchScore = doc.data().matchScore;
            var description = doc.data().description;
            var thumbnail = doc.data().thumbnail;

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
            let bookmarkCard = document.createElement("div");
            bookmarkCard.innerHTML = `
                <div id="${jobId}" class="col-md-4 mb-4" style="border: solid; border-radius: 10px; border-color: lightgrey">
                    <div class="card h-100">
                        <img id="${thumbnail}" src="${thumbnail || './images/default-thumbnail.png'}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 id="${title}" class="card-title">${title}</h5>
                            <p id="${companyName}" class="card-text"><strong>Company:</strong> ${companyName}</p>
                            <p id="${location}" class="card-text"><strong>Location:</strong> ${location}</p> 
                            <p id="${matchScore}" class="card-text"><strong>Match Score:</strong><span style="color: ${matchScoreColor};"> ${matchScore} (out of 10)</span></p>                            <a id="${shareLink}" href="${shareLink}" target="_blank">Apply Now</a>
                            <i id="${companyName}" class="material-icons float-end ${jobId}">bookmark</i>
                        </div>
                    </div>
                </div>
            `;

            contentDiv.appendChild(bookmarkCard);

            console.log(`#${jobId}` + " doc ID")
            
            // This is the event listener for to bookmark icon to remove a bookmark from the
            // users subcollection. Also implemeneted sweetalerts to make sure users can't make
            // mistakes on accident.
            bookmarkCard.querySelector('i').addEventListener('click', () => {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this bookmark through the bookmarks page",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, remove it!",
                    closeOnConfirm: false
                },
                    function () {
                        swal({
                            title: "Deleted!",
                            text: "Your bookmark has been removed.",
                            type: "success",
                            confirmButtonColor: "#25446a"  // Second alert confirm button color
                        });
                        removeBookmark(jobId);
                    });
            });

        });
    })
}

// This is the function that removes bookmarks. This is activated throught an 
// event listener. It goes into the bookmarks subcollection and deleted that job's
// document. It also immeditally removes it from the screen so users get immediate feedback of their action,
function removeBookmark(jobId) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            // Reference to the user's subcollection "bookmarks"
            let bookmarksRef = db.collection("users").doc(user.uid).collection("bookmarks");

            // Add the job to the "bookmarks" subcollection
            const bookmarkIcon = document.getElementById(jobId);


            console.log("The bookmark is getting deleted.");
            bookmarksRef.doc(jobId).delete();

            bookmarkIcon.getElementsByClassName(jobId)[0].remove();

            // Find the card element by jobId and hide it
            let cardElement = document.getElementById(jobId);
            if (cardElement) {
                cardElement.style.display = "none";  // Hide the element
            }

            console.log("Confirm works");

            console.log("Job Id: " + jobId);

        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}