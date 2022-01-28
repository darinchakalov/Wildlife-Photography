# Wildlife-Photography

Wildlife Photography is a test application created with Express.js, Handlebards and Mongoose

## Installation

Use the package manager to install the modules.

```bash
npm install
```

## Application initialization

To start the application please use the below command
```bash
npm start
```

## Usage

The application supports the following actions:
- user registration, login and logout
- creation of posts (for logged in users)
- all posts page
- details page for each post with different actions depending if user is logged in or is creator of the post
- edit and delete options for creator of the posts
- upvoting and downvoting for logged in users who are not creator of the post 
- information about the current rating of the post as well as which users have voted
- user posts page