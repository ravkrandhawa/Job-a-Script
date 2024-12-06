// Used to access serpAPI's data bank for real time data
async function getData() {
    const url = "https://serpapi.com/search.json?q=Developer+careers&location=Austin,+Texas,+United+States";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const location = data.location;
        console.log(location);
    } catch (error) {
        console.log(error);
    }
}
getData();