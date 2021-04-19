// import fetch
const fetch = require('node-fetch');

// fetching data from theMovieDB 
const getData = async function fetchData(url){
    const apiData = await fetch(url)
        .then(response => response.json())
        // if the api request fails it will console.log an error
        .catch(err => console.log(err))
    // returns the fetched data
    return apiData;
};

// export modules 
module.exports = getData;
