// somehow returns undefined, delete later not working
const fetchData = require('./fetchData');

const randomSortedMovieData = async (sortedData) => {
    // API vars to send with fetch
    const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
            key = process.env.KEY,
            language = 'en-US',
            page = '1',
            region = 'GB';
    const url = `${endpoint}api_key=${key}&language=${language}&page=${page}&region=${region}`;

    // fetching data from api
    const movieData = await fetchData(url);

    // PICKING RANDOM ORDER of objects 
    // random order so its not the same order every time someone plays
    // still search what the .5 for is
    const sortedMovies = movieData.results.sort(() => .5 - Math.random());
    sortedData = sortedMovies;
    return sortedData;
}

module.exports = randomSortedMovieData;