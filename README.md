# Goosechat

This is a fullstack chat web application using the MEAN stack

## Installation
Clone repository
    `git clone https://github.com/hollandzac/goosechat.git`
Install dependencies
    `npm install`
    `cd server`
    `npm install`

## Database Structure
 ### User
 - _id
 - username
 - email
 - imagePath: Path to local static image
 - passHash: BCrypt password
 -	superAdmin
 -	groupAdmin

### Message
 - ChannelId
 - _id
 - senderId
 - mesge
 - senderUsername
 - imagePath

### Group
 - _id
 - groupName
 - channels: Array
	 - _id
	 - name
	 - channels: Array
		 - id's
 - description
 - users: Array
	 - id's
 - assistants: Array
	 - id's

## Project Structure
 - src: contains angular frontend -> App: 
	 - services: All data services
	 - guards: Router guards
	 - componets: All Components
- server: A backend server
	- api: All routes and handlers for API
	- config: Configuration files for multer, mongodb, socketIO and passport
	- utils: Password Utilities
	- server.js: Main server file

    

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