import React, {useState, useEffect} from 'react';

// is needed for getting data from URL
import queryString from 'query-string'

import io from 'socket.io-client'
import Header from './Header';
import Input from './Input';
import Messages from './Messages';

let socket;

function Messenger({location}) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    // State for each individual message
    const [message, setMessage] = useState("");
    // The Array that stores all messages
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000'

    useEffect(()=>{
        // Retrieves the data users entered on login
        // The queryString returns an object that you can access
        const {name, room} = queryString.parse(location.search)
        
        // Connects each user, which is a socket, to the server
        socket = io(ENDPOINT)

        // Sets the name and room state of each user
        setName(name)
        setRoom(room)

        // Takes a specific event that happens on the server, and emits an object with a name and a room
        socket.emit('join', {name, room}, ()=>{
        
        })

        // disconnect event that happens when unMounting
        return () =>{
            // Emits the disconnect function in the server
            socket.emit('disconnect')

            // Turns the socket (user) off
            socket.off()
        }

    },
    // Makes it so that the useEffect only renders when the endpoint, and location are changed
    [ENDPOINT, location.search])


    // For handling messages on the front-end
    useEffect(()=>{
        // Listens for a message from a user
        socket.on('message', (message) => {
            // adds any new message to the current messages
            setMessages([...messages, message])
        })
    }, 
    // this useEffect only runs when messages changes
    [messages])

    // Function for sending messages
    const sendMessage = (event) =>{
        // stops page from reloading
        event.preventDefault()

        // if there's a message then it emits the message
        if (message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className='outerContainer'>
            <div className='container'>
                <Header room={room}/>


                <Messages 
                    messages={messages} 
                    name={name}
                />

                <Input 
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />

            </div>
        </div>
    );
}

export default Messenger;