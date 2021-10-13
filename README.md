# Goosechat

This is a fullstack chat web application using the MEAN stack

## Installation
Clone repository
    `git clone https://github.com/hollandzac/goosechat.git`
Install dependencies
    `npm install`
    `cd server`
    `npm install`

## Project Structure
### Angular Frontend
📦src
 ┣ 📂app
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜admin.component.css
 ┃ ┃ ┣ 📜admin.component.html
 ┃ ┃ ┣ 📜admin.component.spec.ts
 ┃ ┃ ┗ 📜admin.component.ts
 ┃ ┣ 📂channel
 ┃ ┃ ┣ 📜channel.component.css
 ┃ ┃ ┣ 📜channel.component.html
 ┃ ┃ ┣ 📜channel.component.spec.ts
 ┃ ┃ ┗ 📜channel.component.ts
 ┃ ┣ 📂group
 ┃ ┃ ┣ 📂add-channel
 ┃ ┃ ┃ ┣ 📜add-channel.component.css
 ┃ ┃ ┃ ┣ 📜add-channel.component.html
 ┃ ┃ ┃ ┣ 📜add-channel.component.spec.ts
 ┃ ┃ ┃ ┗ 📜add-channel.component.ts
 ┃ ┃ ┣ 📂manage-users
 ┃ ┃ ┃ ┣ 📜manage-users.component.css
 ┃ ┃ ┃ ┣ 📜manage-users.component.html
 ┃ ┃ ┃ ┣ 📜manage-users.component.spec.ts
 ┃ ┃ ┃ ┗ 📜manage-users.component.ts
 ┃ ┃ ┣ 📂update-channel
 ┃ ┃ ┃ ┣ 📜update-channel.component.css
 ┃ ┃ ┃ ┣ 📜update-channel.component.html
 ┃ ┃ ┃ ┣ 📜update-channel.component.spec.ts
 ┃ ┃ ┃ ┗ 📜update-channel.component.ts
 ┃ ┃ ┣ 📜group.component.css
 ┃ ┃ ┣ 📜group.component.html
 ┃ ┃ ┣ 📜group.component.spec.ts
 ┃ ┃ ┗ 📜group.component.ts
 ┃ ┣ 📂groups
 ┃ ┃ ┣ 📂add-group
 ┃ ┃ ┃ ┣ 📜add-group.component.css
 ┃ ┃ ┃ ┣ 📜add-group.component.html
 ┃ ┃ ┃ ┣ 📜add-group.component.spec.ts
 ┃ ┃ ┃ ┗ 📜add-group.component.ts
 ┃ ┃ ┣ 📂update-group
 ┃ ┃ ┃ ┣ 📜update-group.component.css
 ┃ ┃ ┃ ┣ 📜update-group.component.html
 ┃ ┃ ┃ ┣ 📜update-group.component.spec.ts
 ┃ ┃ ┃ ┗ 📜update-group.component.ts
 ┃ ┃ ┣ 📜groups.component.css
 ┃ ┃ ┣ 📜groups.component.html
 ┃ ┃ ┣ 📜groups.component.spec.ts
 ┃ ┃ ┗ 📜groups.component.ts
 ┃ ┣ 📂guards
 ┃ ┃ ┣ 📜auth-guard.guard.spec.ts
 ┃ ┃ ┣ 📜auth-guard.guard.ts
 ┃ ┃ ┣ 📜super-auth.guard.spec.ts
 ┃ ┃ ┗ 📜super-auth.guard.ts
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜login.component.css
 ┃ ┃ ┣ 📜login.component.html
 ┃ ┃ ┣ 📜login.component.spec.ts
 ┃ ┃ ┗ 📜login.component.ts
 ┃ ┣ 📂navbar
 ┃ ┃ ┣ 📜navbar.component.css
 ┃ ┃ ┣ 📜navbar.component.html
 ┃ ┃ ┣ 📜navbar.component.spec.ts
 ┃ ┃ ┗ 📜navbar.component.ts
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📜profile.component.css
 ┃ ┃ ┣ 📜profile.component.html
 ┃ ┃ ┣ 📜profile.component.spec.ts
 ┃ ┃ ┗ 📜profile.component.ts
 ┃ ┣ 📂register
 ┃ ┃ ┣ 📜register.component.css
 ┃ ┃ ┣ 📜register.component.html
 ┃ ┃ ┣ 📜register.component.spec.ts
 ┃ ┃ ┗ 📜register.component.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜authentication.service.spec.ts
 ┃ ┃ ┣ 📜authentication.service.ts
 ┃ ┃ ┣ 📜channel-data.service.spec.ts
 ┃ ┃ ┣ 📜channel-data.service.ts
 ┃ ┃ ┣ 📜group-data.service.spec.ts
 ┃ ┃ ┣ 📜group-data.service.ts
 ┃ ┃ ┣ 📜socket-service.service.spec.ts
 ┃ ┃ ┣ 📜socket-service.service.ts
 ┃ ┃ ┣ 📜user-data.service.spec.ts
 ┃ ┃ ┗ 📜user-data.service.ts
 ┃ ┣ 📜app-routing.module.ts
 ┃ ┣ 📜app.component.css
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.spec.ts
 ┃ ┣ 📜app.component.ts
 ┃ ┗ 📜app.module.ts
 ┣ 📂assets
 ┃ ┣ 📜.gitkeep
 ┃ ┣ 📜file-arrow-down.svg
 ┃ ┗ 📜goose.png
 ┣ 📂environments
 ┃ ┣ 📜environment.prod.ts
 ┃ ┗ 📜environment.ts
 ┣ 📜favicon.ico
 ┣ 📜index.html
 ┣ 📜main.ts
 ┣ 📜polyfills.ts
 ┣ 📜styles.css
 ┗ 📜test.ts
    

## Testing
Intergrated testing using mocha and chai for server
    `cd server`
    `npm test`
Front end testing with jasmine and karma
    `ng test`

## Rest API
A RESTFUL API for the goosechat frontend

## Groups API

|               URL               | METHOD |     Paramaters     |         Success         |           Error          |           Description           |
|:-------------------------------:|:------:|:------------------:|:-----------------------:|:------------------------:|:-------------------------------:|
|           /api/groups           |   GET  |        null        |     200: All groups     |            400           |        Returns all groups       |
|         /api/groups/:id         |   GET  | id: group_ObjectID |    200: Group with ID   |            400           |     Gets a group matching ID    |
|           /api/groups           |  POST  | id: group_ObjectID | 201: New Group Location |    404: Conflcit, 400    |     Adds a group to database    |
|      /api/groups/:id/users      |   PUT  | id: group_ObjectID |       201: UserID       |    404: Conflict, 400    |       Adds a user to group      |
|    /api/groups/:id/assistants   |   PUT  | id: group_ObjectID |       201: UserID       |    404: Conflict, 400    | Adds a user to group assistants |
| /api/groups/:id/users/:username | DELETE | id: Group_ObjectID |      200: "Success"     |            400           |      Remove user from group     |
|         /api/groups/:id         | DELETE | id: Group_ObjectID |     204: No Content     | 404: No group Found, 400 |    Delete a group matching id   |
|         /api/groups/:id         |   PUT  | id: Group_ObjectID |     204: No Content     |            400           |          Update A group         |

## Users API

| URL                             | METHOD | Parameters            | Success           | Error                   | Description                                   |
|---------------------------------|--------|-----------------------|-------------------|-------------------------|-----------------------------------------------|
| /api/login                      |  POST  | NULL                  | 200: User         | 401: Unauthorized       | Authenticates user with username and password |
| /api/register                   | POST   | NULL                  | 200: Created User | 409: Username take, 400 | Registers a new user in the database          |
| /api/users                      | GET    | NULL                  | 200: All users    | 400                     | Returns all users NOT USED                    |
| /api/users/:id                  | PUT    | id: User_ObjectId     | 204: No Content   | 400                     | Updates a user matching id                    |
| /api/users                      | DELETE | NULL                  | 204: No Content   | 404                     | Deletes all users except superadmin           |
| /api/users/groupadmin           | POST   | NULL                  | 204: No Content   | 400                     | Promotes/Demotes a user                       |
| /api/users/:userId/profileimage | POST   | userId: User_ObjectId | 200               | 500                     | Upload user profile image                     |

## Channel API
| URL                                      | METHOD | Parameters                                          | Success              | Error                       | Description                      |
|------------------------------------------|--------|-----------------------------------------------------|----------------------|-----------------------------|----------------------------------|
| /api/groups/:id/channels                 | GET    | id: Group_ObjectId                                  | 200: All channels    | 400                         | Gets all channels for that group |
| /api/groups/:id                          | POST   | id: Group_ObjectId                                  | 201                  | 401                         | Adds a channel to group          |
| /api/groups/:groupId/channels/:channelID | PUT    | groupId: Group_ObjectId channelID: Channel_ObjectID | 200: Updated Channel | 400                         | Updates a channel                |
| /api/groups/:groupId/channels/:channelID | PUT    | groupId: Group_ObjectID channelID: Channel_ObjectID | 200: UserID          | 400                         | Adds a user to channel           |
| /groups/:groupId/channels/:channelId     | DELETE | groupid: Group_ObjectId channelid: Channel_ObjectId | 204: No Content      | 404: Channel not found, 400 | Deletes a Channel                |