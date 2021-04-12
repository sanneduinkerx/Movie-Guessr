# Real-Time Web @cmda-minor-web · 2020/21 - Movie Guessr

## Table of Contents
- [Description 📋](#description-)
- [Concept ✏️](#concept---movie-guessr-%EF%B8%8F)
    - [Features 🛠](#features-)
    - [Live Link 🔗](#live-link-)
    - [Data Life Cycle](#Data-life-cycle)
- [API 🍿](#api-)
    -[Data Model](#data-model)
- [How to Install ⬇️](#how-to-install-this-project-%EF%B8%8F)
- [npm Packages 📦](#how-to-install-this-project-%EF%B8%8F)
- [Next steps 🐾](#next-steps-)
    - [To Do](#to-do)
- [Sources 📚](#sources-)

# Description 📋
For the course Real Time Web, I'm making a Real Time web app, as the name says. I will learn to work with websockets and real time data with multiple users at client side. 

## Concept - Movie Guessr ✏️
My idea is to make a Guessing game with movies. So there will be a chat available for the users to guess the movie. And my ultimate goal is that 1 user in the game room can see the movie poster and he/she types a hint, in total 3 hints. And the other users have to guess with the hints which movie it is. The hint can be an actor who plays in the movie, or a popular quote from the movie. Maybe later something with *firebase* to make rooms and all data.

A little sketch: 

![](https://user-images.githubusercontent.com/60745348/114186180-d548a380-9946-11eb-8cd1-b3b4dd5c6f0b.png)

Other concepts:
- With smileys instead of hints
- Drawing instead of hints
- Or just a scene from a movie and everyone guesses

### Features 🛠
- **Chat** function, so all users can guess which movie is described with given hints from 1 user
- **Hints**, 1 user can give 3 hints with input field
- An **API** from IMDB or another api to display movie posters
- **Point system**, to keep track of points earned

### Live Link 🔗
No link available yet. 

### Data Life cycle
No life cycle yet, more will follow.

## API 🍿
No API used yet, more info will follow.

### Data Model

No model yet

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
    to use fetch(url) to fetch data from lastFM API.

## Next steps: 🐾
My first step is to make **the chat** work so that I understand the websocket. And then to get data from an API, maybe IMDb or ThemovieDB. And load some data into the web app. After that i can begin adding more function to it if the main features work. Maybe first i will start with just a scene from a movie as image for all users to see and then everyone can guess from which movie it is. And if that works i can add more of the features from the ultimate concept.

First step sketch:

![](https://user-images.githubusercontent.com/60745348/114186198-d974c100-9946-11eb-8d00-c10d029861af.png)

### To Do:
- [ ] Chat function working
- [ ] Use insomnia to see how the API is structured
- [ ] Load API data in web app
- [ ] Data Life cycle


## Sources 📚
Sources I used in this course 

- No sources used yet, more will follow.

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
