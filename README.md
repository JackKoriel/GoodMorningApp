# GoodMorningApp

A social media app with user login and authentication protocols, password hashing with bycrypt. Users are able to search & add friends, send posts and messages.

## initial setup:

after cloning the repo on your local machine using a program such as VScode, there should be 3 sub-folders:

1. client
2. server
3. socket

ctrl + j, split to 3 terminals and perform the following actions:

1. server terminal:

```sh
cd server
yarn install
yarn start:server
```

2. socket terminal:

```sh
cd socket
yarn install
yarn start
```

3. client terminal:

```sh
cd client
yarn install
yarn start
```

## APIs

there are 3 APIs being used on this project at the moment, they are all free and can be found here:

1. Horoscope API:

```sh
https://rapidapi.com/sameer.kumar/api/aztro/
```

2. weather API:

```sh
https://rapidapi.com/community/api/open-weather-map/
```

3. News API:

```sh
https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/google-news/
```

a .env file with the correct key might be required, to save yourself the trouble, dummy data can be used.
first ensure that the useEffect is commented out in each API componenet in the client and the app should pull the info from the dummy data which is set as initial data for now in the component useState hook.

## Databases

mostly MongoDB is used for all data operation, except for the public chat, Firebase is used instead in there - all data operation is handled from the client for public chat.

mongoDB might require a .env file with a proper key in the backend.

batchImport is operational however, the data is outdated so it's better to create your own users by signing up.

## Features

- signin/signup with authentication protocols and password hashing with bycrypt.
- tailored APIs gadgets for news depending on user's country, weather depending on user's city and horoscope depending on user's
  zodiac
- tailor widget positioning for one session by using the drag and drop function
- add favorite horoscopes to a favorite list and add news articles to a reading list to read later
- search for friends and follow/unfollow
- view posts and profiles
- posts images and text with mongoDB and Cloudinary
- change settings and information
- post status/mood
- message indivisual users with MongoDB and Socket.io and in public rooms with Firebase

## Technologies behind the code

- Utilizes RESTful API built with an Express framework to hit third party endpoints to collect localized information related to the user’s preferences (e.g. weather, news, horoscopes)
- Profile pictures and images associated with user posts are hosted on Cloudinary with endpoints stored in MongoDB for subsequent retrieval.
- User tokens are verified on all API routes to ensure access to information is secure. Tokens expire when logging out after 24 hours have passed.
- The front-end is created with React using functional components and hooks for internal state logic. Additional libraries were added for drag and drop functionality.
- All information related to users and posts are stored in MongoDB in a series of collections that were designed to eliminate data redundancy.
