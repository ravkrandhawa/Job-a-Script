//Global variable pointing to the current user's Firestore document
var currentUser;


function bookmarkCollection(bookmark) {
    
}

function  updateBookmark(data) {
    currentUser.get().then(doc =>{
    console.log(doc.data().bookmarks);
    currentBookmarks = doc.data().bookmarks;
        if (currentBookmarks && currentBookmarks.includes(data)) {
            console.log(data);
            currentUser.update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(data),
            })
            .then(function(){
                console.log("This bookmark is removed for " + currentUser);
                let iconID = "save-" + data; //"save-20974867"
                console.log(iconID);
                document.getElementById(iconID).innerText = "bookmark_border";
            })
        } else {
            currentUser.set({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(data),
            },
            {
                merge: true
            })
            .then(function(){
                console.log("This bookmark is removed for " + currentUser);
                let iconID = "save-" + data;
                document.getElementById(iconID).innerText = "bookmark";
            })
        }
    })
}