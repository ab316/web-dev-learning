==== Social Media ====

# Introduction

This project is a social media application, like facebook

## Technologies

- TypeScript
- React
- Express
- MongoDB
- Mongoose

## Features
- Login and Register users. Only in memory. No session at the moment
- Create posts with images
- Like/Unlike posts
- Follow/unfollow people
- Feed showing posts of followings
- Timeline show user's post

## Technical Details

### Server

The server is written in express and provides CRUD operations for users and posts. It also provides endpoints to follow/unfollow users and like/unlike posts.

### Client
The client is made with Create React App. It talks to the server over REST for all the functionality.

# Usage
## Setup
1. In the `server` package, make a file `.env` and add the line `MONGODB_URL=<YOUR MONGODB URL>` with the complete URL for the database
1. `yarn workspace server start` in one terminal
1. `yarn workspace client start` in another terminal

## Steps
1. Import the requests collection `Social Media.postman_collection.json` into Postman
1. Use the requests to create some users, follow them, etc.
1. Visit `http://localhost:3000`
1. Login with a user
1. Create posts, upload images
1. Check the posts are go in the feed
1. Visit other user's profile at `/profile/<username>` and see their timeline

# Future Work
- Login session
- Online friends
- Realtime chat
- Search users