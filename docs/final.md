# Team Alef (ℵ)
<h2>Application name: <a href="https://cs326project.herokuapp.com/">KanvasWire</a></h2>
<h2>Semester: Fall 2022</h2>

# Overview

# Team Members
- Hieu Nguyen ([HieuHongHao](https://github.com/HieuHongHao))
- Peter Phan ([PPhan-sil](https://github.com/PPhan-sil/))
- Phat Nguyen ([PeterNg15](https://github.com/PeterNg15))

# User Interface
- Toggle light/dark mode

## Landing page
- View new projects, project leaderboard
- Default landing page

<img src="../demos/final/landing_page.gif">

## Login
- Login and be redirected to account page
- Authorization (more info [here](#authorization))

<img src="../demos/final/login.gif">

## Registration 
- Create new account
- Passwords are encrypted in DB using SHA-256 (more info [here](#authentication))

<img src="../demos/final/create_account.gif">

<img src="../demos/newUser.png">

## Account
- Display account info (profile picture, username)
- Display personal statistics
- Manage projects
- Manage account (edit passwords, delete account)

<center><h2>Manage projects</h2></center>
<img src="../demos/final/delete_project.gif">

## Feed
- Toggle between "new", "top", and "github projects
- Like and unlike a post
- View post contents
- Redirection to post-specific pages (project page)
- Add new posts
- Infinite scrolling
- Search posts by tags or title (i.e. 'tags: [...]' and 'title: [...]')
- Search posts from Github by tags or title

<img src="../demos/final/feed.gif">

<center><h2>Search</h2></center>
<img src="../demos/final/search.gif">

<center><h2>Search in Github</h2></center>
<img src="../demos/final/search_github.gif">

<center><h2>Create Post</h2></center>
<img src="../demos/final/new_post.gif">

## Project page
- Unique URL
- Add comment
- See number of likes
- View post content
- Redirection to Canvas page

<img src="../demos/final/project_page.gif">

## Canvas
- Unique URL
- Draw on canvas (real-time, change paint brush, toggle eraser, change brush color, change brush size)
- Drawing is interactive through websockets
- Chat (send messages and math equations in real-time, toggle chat visibility)
- Each project has its own canvas page and chat
- Notification when someone joins canvas page with avatar of active users

<img src="../demos/final/canvas.gif">

<center><h2>Chat</h2></center>
<img src="../demos/final/chat.gif">

# APIs

| Path          | Method      | Input | Example     | Description |
| ------------- | ----------- | ----------- | ----------- | ----------- |
| `/users/:id`  | GET         | N/A | here]()         | Get user by id         |
| `/users` | POST | username, email, password, avatar | [here]() | Create user 


<!-- api/posts: returning all the posts query: tag: return all the posts with matching tags titles: return all the posts with matching titles
api/posts/:id: return the data of post with matching id
api/posts?sort=dec: sorts the post in descending order
api/posts/id/comment: get all the comments of a post
api/users: return all users information
api/users/id: return all information of user
api/canvas: print all information of every canvas
api/canvas/id: get all the information of a certain canvas -->


# Database

# URL Routes/Mappings

# Authentication
Passwords are encrypted using SHA256 (1-way encryption). During login we encrypt the string and compare it with the password stored in the database (this password is already encrypted). You can see this in ```modal.js```:

```javascript
const hashPassword = await sha256(password, 12)
const correctPass = hashPassword === user[0].password;
```

## Authorization
- You can only use some features if you are already login (authenticated)

In the following example, you only have the option to "create post" once you're logged in:
<img src="../demos/final/authorization_example.gif">

# Division of Labor

# Conclusion