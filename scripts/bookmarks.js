//Function that calls everything needed for the main page  
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

// Function to display job listings in the HTML content div
function displaySaved(bookmarksCollection) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "";

    bookmarksCollection.get().then(allBookmarks => {
        allBookmarks.forEach(doc => {

            var title = doc.data().title;
            var companyName = doc.data().company_name;
            var shareLink = doc.data().share_link;
            var jobId = doc.data().job_id;
            var location = doc.data().location;
            var matchScore = doc.data().matchScore;
            var description = doc.data().description;
            var thumbnail = doc.data().thumbnail;

            let bookmarkCard = document.createElement("div");
            bookmarkCard.innerHTML = `
                <div id="${jobId}" class="col-md-4 mb-4" style="border: solid; border-radius: 10px; border-color: lightgrey">
                    <div class="card h-100">
                        <img id="${thumbnail}" src="${thumbnail || './images/default-thumbnail.png'}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 id="${title}" class="card-title">${title}</h5>
                            <p id="${companyName}" class="card-text"><strong>Company:</strong> ${companyName}</p>
                            <p id="${location}" class="card-text"><strong>Location:</strong> ${location}</p> 
                            <p id="${description}" class="card-text">${description ? description.substring(0, 100) + '...' : ''}</p>
                            <p id="${matchScore}" class="card-text"><strong>Match Score:</strong> ${matchScore}</p>
                            <a id="${shareLink}" href="${shareLink}" target="_blank" class="btn btn-primary">Apply Now</a>
                            <i id="${companyName}" class="material-icons float-end ${jobId}">bookmark</i>
                        </div>
                    </div>
                </div>
            `;

            contentDiv.appendChild(bookmarkCard);

            console.log(`#${jobId}` + " doc ID")
            // Attach event listener to the bookmark icon

            // let bookmarksRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("bookmarks");
            // bookmarksRef.doc(doc.job_id).get().then(docSnapshot => {
            //     if (docSnapshot.exists) {
            //         bookmarkCard.getElementsByTagName("i")[0].innerHTML = "bookmark";
            //     }
            // });

            // bookmarkCard.querySelector('i').onclick = () => {
            //     // add if statement
            //     bookmarkCollection(currentUser);
            // };

            // Attach event listener to the bookmark icon
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
                        swal("Deleted!", "Your bookmark has been removed.", "success");
                        removeBookmark(jobId);
                    });
            });

        });
    })
}

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