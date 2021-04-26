# Real-Time Web @cmda-minor-web · 2020/21 - Movie Guessr

# Description 📋
For the course Real Time Web, I'm making a Real Time web app, as the name says. I will learn to work with websockets and real time data with multiple users at client side. 

## Table of Contents
- [Concept ✏️](#concept---movie-guessr-%EF%B8%8F)
    - [Live Link 🔗](#live-link-)
    - [Features 🛠](#features-)
    - [Wishlist](#wishlist)
- [Data Life Cycle 🚲](#data-life-cycle-)
    - [Real Time Events 💬](#real-time-events-) 
- [API 🍿](#api-)
    - [Data Model](#data-model)
    - [How to get api key](#how-to-get-api-Key)
- [How to Install ⬇️](#how-to-install-this-project-%EF%B8%8F)
- [npm Packages 📦](#how-to-install-this-project-%EF%B8%8F)
- [Sources 📚](#sources-)

## Ultimate Concept - Movie Guessr ✏️
My idea is to make a Guessing game with movies. So there will be a chat available for the users to guess the movie. And my ultimate goal is that 1 user in the game room can see the movie poster and he/she types a hint, in total 3 hints, and the other users have to guess with the hints which movie it is. The hint can be an actor who plays in the movie, or a popular quote from the movie. Maybe later something with *firebase* to make rooms and all data.

A little sketch: 

![](https://user-images.githubusercontent.com/60745348/114186180-d548a380-9946-11eb-8cd1-b3b4dd5c6f0b.png)

**Other concepts I had:**
- User gives emojis instead of hints, as hints so other users can guess the movie
- Just a scene from a movie or poster cover blurred and everyone guesses which movie it is, no different roles or turns
- *Completely different:* Shared booklist, everyone can give their review on the book they read, others can read the review

**Chosen Concept:**
I chose the *movie Guessr with hints*, because i think it'll be a nice concept to work on, especially the game feature with multiple users. And there are multiple roles within the game 
which is a little challenge for me and i thought that would be interesting. And because i'm a fan of movies, and know where most actors play in or famous phrases, i thought the hints would be nice as a feature.

### Live Link 🔗

![](https://user-images.githubusercontent.com/60745348/116053610-2bbe1d80-a67b-11eb-895a-91dbe54b8ad8.png)
![](https://user-images.githubusercontent.com/60745348/116053620-2e207780-a67b-11eb-8c9c-b9853a93baa6.png)

You can check out the application [here](https://movie-guessr-cmd.herokuapp.com/).

### Features 🛠
- **Chat** function, so all users can guess which movie is described with given hints from 1 user
- An **API** from IMDB or another api to display movie posters
- **Point system**, to keep track of points earned

### Wishlist

#### Must have:
- [X] Chat function with display name
- [X] Guess correct movie with feedback and then show next poster/scene
- [X] Loading API data from TheMovieDB, pick random movie poster/scene from api
- [ ] Implement point system 

### Must Have Concept: 

![](https://user-images.githubusercontent.com/60745348/114186198-d974c100-9946-11eb-8d00-c10d029861af.png)

#### Should have
- [ ] show movie poster to ONE user (different roles)
- [ ] Hints 
- [ ] Database

#### Would have
- [ ] Different rooms
- [ ] I give up, button or skip button
- [ ] User can choose how many rounds

#### Could have 
- [ ] All time score board
- [ ] invite friends
- [ ] Login

## Data Life Cycle 🔄

Version 2:
*Maybe need to be changed*

![](https://user-images.githubusercontent.com/60745348/116053131-9cb10580-a67a-11eb-89bc-824234fac9c6.png)

<!-- 
version 1:
![](https://user-images.githubusercontent.com/60745348/114559308-e148a400-9c6b-11eb-8da2-5780674a3610.png) -->

<!-- **Note**: I will make this a digital version, with colors + functions on the server side to show which functions are used. And later a database if i use one. -->

### Real Time Events 💬
Real Time events i used with socket.io are:

- userConnected, to send message that someone connected
- username, to send username
- Scoreboard, to send and update scores of users
- Message, to send and receive messages for all clients.
- userDisconnected, to send message that someone disconnected.

More will follow while working on this project.


## API 🍿
The API i use within this project is from [The MovieDB](https://developers.themoviedb.org/3/getting-started/introduction). This API has a wide range of get methodes to get data. You can request methodes from movies, tv shows, tv seasons or people. I chose to get requests from movies. The MovieDB has different GET methodes to use, for example:

- Get Latest
- Get Now Playing
- Get Top Rated
- Get Popular 
- Get Upcoming

I will be using the Get Top Rated methode. To see how the url and data can be used i used the application **Insomnia**. See [Data Model](#data-model), below. To see how the JSON file is displayed. The URL has an **endpoint**: *https://api.themoviedb.org/3/movie/top_rated*. You can also give a language, region and which page. To get images from the API i use the URL *https://image.tmdb.org/t/p/w500/{poster-path}*. The poster path is in the JSON file with every object, if it has a poster path. Also the api does have a backdrop photo which is a scene from the movie and doesnt provide a title in the image. This i could use if i go back to a simple game where there are no roles.

<img width="1000" alt="Screenshot 2021-04-18 at 13 34 40" src="https://user-images.githubusercontent.com/60745348/115144222-cbf8be80-a04b-11eb-9dd2-c0efb5df3e6c.png">

### Data Model 
The data looks like this:

<img width="1000" alt="Screenshot 2021-04-18 at 13 37 53" src="https://user-images.githubusercontent.com/60745348/115144223-cdc28200-a04b-11eb-947d-7cb794a2095e.png">

### How to get API Key

To get an API key you have to register for an account first. Then in your account click API in the left sidebar, then click create and choose for what you are gonna use the API and then you can fill in the form for an API request. After that you can immediately use the API key. 

## How to install this project ⬇️

1. Clone this project 

    In terminal:
    ```
    git clone https://github.com/sanneduinkerx/Movie-Guessr
    ```

2. Install dependencies
    ```
    npm install
    ```

3. Start the server:
    ```
    npm run start
    ```

    or 

    ```
    npm run dev
    ```

4. Go to localhost
    ```
    http://localhost:7070/
    ```

## npm Packages 📦
The npm packages i will use in this project:

- For template engine: EJS 
    To load a template in a certain path you can use res.render('templateName'), and you can give data with it to render server side and serve to client. For example you can give the fetched data from an API to the template, and with <%= data.name %> you can put it in the template and it wil render the right data.
- Express: 
    A web framework with feature for routing. And supports template engines such as EJS. for more info [click here](https://www.npmjs.com/package/express)
- Node-fetch: 
    to use fetch(url) to fetch data from API.

## Sources 📚
Sources I used in this course 

- Math.Random() Mozilla- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- Example from Justus Sturkenboom - [Github](https://github.com/ju5tu5/barebonechat)
- Cheatsheet Emit - [Socket.io](https://socket.io/docs/v3/emit-cheatsheet/index.html)

## License 🔒
This repository is licensed as [MIT]() by © 2021 Sanne Duinker


<!-- note -->
<!-- zet in readme wat je concept was maar niet aan toe bent gekomen!!!!!!! -->

<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->
