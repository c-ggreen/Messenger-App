// This file holds functions that manage the users

// An array for all of the users
const users = []

// Function responsible for adding a user with an ID, Name, and Room
const addUser = ({id, name, room}) =>{

    // sets the data of the name and room to a standard format
    name = name.trim().toLowerCase
    room = room.trim().toLowerCase

    // checks if there is an existing user in the room with the same name
    const existingUser = users.find((user) => user.room === room && user.name === name)

    // rejects the name is there is an existing user
    if(existingUser) {
        return {error: 'Username is taken'}
    }

    // if there isn't an existing user, a user object is created with an id, name, and room
    const user = {id, name, room}

    // the user is is then pushed into the users array
    users.push(user)

    // returns user
    return {user}
}

// Function responsible for removing a user based on their ID
const removeUser = (id) =>{
    // finds the index of the user with a specific id
    const index = users.findIndex((user) => user.id === id)

    // removes the user from the array
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Function responsible for finding a user/determining they exist
const getUser = (id) => users.find((user) => user.id === id)


// Function responsible for getting all users in a room
const getUsersInRoom = (room) => users.filter((user) => user.room === room)


// exporting the functions
module.exports = {addUser, removeUser, getUser, getUsersInRoom}