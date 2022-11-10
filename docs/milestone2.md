
# Part 0: Project API Planning
## Data Model
 -  api/posts: returning all the posts 
    query: 
        tag: return all the posts with matching tags
        titles: return all the posts with matching titles
 -  api/posts/:id: return the data of post with matching id
 -  api/users: return all users information
 
## Github API Integration
We will be using the Github API to get the current top 5 repositories in the world. We will use this data and then display it to our feed page.

## Our APIs
### User Object:
- Fields: Id, email, name, avatar, posts, totalPosts, likes, comments, dateCreated, favouriteTech, password

| Fields        | Data Type   |
| ------------- | ----------- |
| Id            | int         |
| email         | string      |
| avatar        | string      |
| totalPosts    | int         |
| likes         | int         |
| comments      | int         |
| dateCreated   | datetime    |
| favouriteTech | string      |
| password      | string      |

<img src="users_read.png"/>

- API integration: Yes, but temporary until we set up a database with authentication. Login functionality currently uses this API.

Post Object fields:
- Id, authorId, tags, title, content, likes, commentsId
- API integration: Yes. Create can be done on feed and dashboard. Read occurs on feed, forum, and dashboard. Update (for likes) occurs on feed and forum. Delete occurs on dashboard.

Comment Object fields:
- Id, authorId, postId, content, likes
- API integration: Yes. Create, read, update (likes) occurs on forum page (maybe add deletion later).

Canvas Object fields:
- id, postId, ownerId, drawing, users
- API integration: No. Will implement CRUD with database.


# Part 1: Back-end Skeleton Code
## Application Structure

```
root/
├─ css/
├─ backend/
│  ├─ database.js
├─ pages/
│  ├─ feed.html
│  ├─ forum.html
│  ├─ canvas.html
│  ├─ dashboard.html
│  ├─ dashboard.html
├─ scripts/
│  ├─ main.js
│  ├─ modals.js
│  ├─ utils.js
├─ package.json
├─ server.js
├─ index.html
```

# Part 2: Frontend implementation
All pages:
- Can logout and login using modal and JS on all pages when applicable.

Feed page:
- Can create posts, search for posts, and like posts with buttons

Forum page:
- Can like post with like button

Dashboard page:
- Can create posts, delete posts, update user password, delete account

Canvas:
- Chat socket integration
