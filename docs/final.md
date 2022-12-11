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

## Users
| Path          | Method      | Input | Example     | Description |
| ------------- | ----------- | ----------- | ----------- | ----------- |
| `/users/:id`        | GET  | N/A                               | [here]() | Get user by id   
| `/users`            | POST | username, email, password, avatar | Use UI   | Create user 
| `/users/delete/:id` | POST | id                                | Use UI   | Delete user and their projects, comments, likes
| `/users/:id`        | PUT  | id, req.body                      | Use UI   | Update user information


## Projects / Posts
| Path          | Method      | Input | Example     | Description |
| ------------- | ----------- | ----------- | ----------- | ----------- |
| `/projects` | GET | N/A | [here]() | Get all projects
| `/projects/:id` | GET | id | [here]() | Get project by ID
| `/projects/author/:id` | GET | authorID | [here]() | Get project by author ID
| `/projects` | POST | authorID, title, content, tags | Use UI | Create a new project
| `/projects/delete/:id` | POST | id | Use UI | Delete project and its comments, likes
| `/projects/:id` | PUT | id, req.body | N/A | Update a project
| `/api/projects/:id/like` | POST | id, userID | Use UI | Create or delete a like for a project
| `/projects/:id/topContributors` | GET | id | [here]() | Ranking users based on number of comments in a project

## Comments
| Path          | Method      | Input | Example     | Description |
| ------------- | ----------- | ----------- | ----------- | ----------- |
| `/projects/:id/comments` | POST | id, authorID, content | Use UI | Create a new comment for a project
| `/comments/author/:id` | GET | id | [here]() | Get comments by user ID
| `/projects/:id/comments` | GET | projectID | [here]() | Get all comments from a project
| `/projects/:id/topChatCommits` | GET | projectID | [here]() | Ranking users based on number of chat commits in a project

## Canvas
| Path          | Method      | Input | Example     | Description |
| ------------- | ----------- | ----------- | ----------- | ----------- |
| `/canvas` | GET | N/A | [here]() | Get all canvas
| `/canvas` | POST | req.body | Use UI | Create canvas stats
| `/canvas/:id/chatCommits` | PUT | id, req.body | Use UI | Update chat commits
| `/users/:id/stats` | GET | userID | Use UI | Get user stats from all projects

## GitHub
| Path          | Method      | Input | Example     | Description |
| ------------- | ----------- | ----------- | ----------- | ----------- |
| `/github_repos` | GET | N/A | [here]() | Get top Github repos


# Database

# URL Routes / Mappings

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