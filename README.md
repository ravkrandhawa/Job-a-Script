# Project Title
* Job-a-Script

## 1. Project Description
* Job-a-Script to help job seekers in the tech community to optimize their job search and secure a job more efficiently by utilizing key information such as their skills, experiences, and more to obtain job postings which are uniquely catered to them.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Ravneet! I love to code, hike, and I am a star wars fan.
* Hello, my name is Nick. I play chess sometimes.
* Hi, my name is Aarshdeep! I'm that guy
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Node.js 
* Git & Github (for collaborative coding work)
* SerpAPI Google Job Search API
* Google Images (for profile-user.png and cityb&w.jpg)
* Canva Pro (to design Job-a-Script logo - JavaScript-logo.png)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Since this is a node app, you will be required to download node and all of its modules. 
* You will need to download dotenv through node as well and integrate the SerpAPI api into this file. 
* Once the first two steps are complete, you must run node on server.js each time you would like to pull from the API. 

## 5. Known Bugs and Limitations
Here are some known bugs:
* There are no bugs with our application. 

## 6. Features for Future
What we'd like to build in the future:
* ...
* ...
* ...
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login HTML file, this is where users login
├── main.html                # main menu HTML file, this is where the user can navigate to different functions of the app 
├── profile.html             # profile edit HTML file, this is where the user can update their profile details 
├── questionnaire.html       # questionnaire HTML file, this is where the user fills out the questionnaire to store their job experience and skills 
├── display_results.html     # job postings HTML file, this is where the fetched job postings from the SerpAPI are displayed and use can either apply or bookmark 
├── saved.html               # bookmarks page HTML file, this is where the user's bookmarks are stored 
├── about_us.html            # about us HTML file, this is where the user can read details about Job-a-Script, how it works, and its mission
├── nav_before_login.html    # skeleton navigation bar HTML file, this is loaded into the HTML pages when the user has not signed in yet 
├── nav_after_login.html     # skeleton navigation bar HTML file, this is loaded into the HTML pages after the user has signed in 
├── footer.html              # skeleton footer HTML file, this is loaded into all HTML pages 
├── server.js                # server side script, this is where node is implemented and data is fetched from the SerpAPI 
└── README.md                # read me file, this details the functionality of the app, how to use it, and the project directory structure

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /cityb&w.jpg             # Image source: https://www.istockphoto.com/photo/commercial-building-in-hong-kong-with-b-w-color-gm841876666-137362849
    /profile-user.png        # Icon source: https://www.flaticon.com/free-icons/generator 
    /JavaScript-logo.png     # Logo created by our team 
├── scripts                  # Folder for scripts
    /authentication.js       # Authentication on firebase side of users  
    /bookmarks.js            # Functionality to store, update, and delete bookmarks from stored data  
    /firebaseAPI_BBY06.js    # API key for firebase which is stored in .gitignore  
    /insertName.js           # Functionality for display_results.html & saved.html to read in the user's name and display it  
    /profile.js              # Functionality to create, update, and delete user profile fields in stored data  
    /questionnaire.js        # Functionality to store and update questionnaire data for user 
    /script.js               # Stores the log out function
    /serpAPI.js              # Functionality to fetch job postings from SerpAPI job scraping tool 
    /skeleton.js             # Loads in the skeleton HTML pages into each page (nav_before_login.html, nav_after_login.html, footer.html)
├── styles                   # Folder for styles
    /displayresults.css      # Applies styling to display_results.html & saved.html  
    /index.css               # Applies styling to index.html (landing page)  
    /main.css                # Applies styling to main.html (main menu page) 
    /profile.css             # Applies styling to profile.html (edit profile page)  
    /questionnaire.css       # Applies styling to questionnaire.html (questionnaire page) 
├── node_modules             # Folder for all node modules that are downloaded when integrating node into app 



```


