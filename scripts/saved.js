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

            let bookmarkCard = document.createElement("div");
            bookmarkCard.innerHTML = `
                <div class="col-md-4 mb-4" style="border: solid; border-radius: 10px; border-color: lightgrey">
                    <div id="${jobId}" class="card h-100">
                        <div class="card-body">
                            <h5 id="${title}" class="card-title">${title}</h5>
                            <p id="${companyName}" class="card-text"><strong>Company:</strong> ${companyName}</p>
                            <a id="${shareLink}" href="${shareLink}" target="_blank" class="btn btn-primary">Apply Now</a>
                            <i id="${companyName}" class="material-icons float-end ${jobId}">bookmark_border</i>
                        </div>
                    </div>
                </div>
            `;
    
    
            contentDiv.appendChild(bookmarkCard);
    
            console.log(`#${jobId}` + " doc ID")
            // Attach event listener to the bookmark icon
            
            let bookmarksRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("bookmarks");
            bookmarksRef.doc(doc.job_id).get().then(docSnapshot => {
                if (docSnapshot.exists) {
                    jobCard.getElementsByTagName("i")[0].innerHTML = "bookmark";
                }
            });
    
            bookmarkCard.querySelector('i').onclick = () => {
                // add if statement
                bookmarkCollection(currentUser);
            };
    
        });
    })
}

// function bookmarkCollection(doc) {
//     firebase.auth().onAuthStateChanged(user => {
//         console.log("Authentication")
//         if (user) {
//             // This are variables to get the id data that should be stored in firestore
//             // let thumbnail = document.querySelector('#${doc.thumbnail}');
//             console.log(doc)
//             let title = doc.title;
//             console.log(title);
//             // let companyName = document.querySelector('#${doc.company_name}');
//             // let shareLink = document.querySelector('#${doc.share_link}');

//             console.log(db.collection("users").doc(user.uid));

//             //extract details of "THE job"
//             var theJob = {
//                 job_id: doc.job_id,
//                 // thumbnail: doc.thumbnail,
//                 title: doc.title,
//                 company_name: doc.company_name,
//                 share_link: doc.share_link

//             }

//             // Reference to the user's subcollection "bookmarks"
//             let bookmarksRef = db.collection("users").doc(user.uid).collection("bookmarks");

//             // Add the job to the "bookmarks" subcollection
//             const bookmarkIcon = document.getElementById(`${doc.job_id}`);

//             bookmarksRef.doc(theJob.job_id).get().then(docSnapshot => {
//                 console.log("Thingy is the not working.");
//                 if (!docSnapshot.exists) {
//                     bookmarksRef.doc(theJob.job_id).set(theJob)
//                     .then(() => {
//                         console.log("Bookmark added successfully!");
//                     })
//                     .catch(error => {
//                         console.log("hi arshypoo0")
//                     });

//                 console.log(`#${doc.job_id}` + " doc ID")
//                 // Attach event listener to the bookmark icon

//                 console.log(bookmarkIcon);
//                 bookmarkIcon.getElementsByClassName(doc.job_id)[0].innerHTML = 'bookmark';
//             } else {
//                 console.log("The bookmark is getting deleted.");
//                 bookmarksRef.doc(theJob.job_id).delete();
                
//                 bookmarkIcon.getElementsByClassName(doc.job_id)[0].innerHTML = 'bookmark_border';
//             }
//             });

//         } else {
//             // No user is signed in.
//             console.log("No user is signed in");
//             window.location.href = "login.html";
//         }
//     });
// }