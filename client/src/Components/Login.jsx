import React, {useState} from 'react';
import {Link} from 'react-router-dom'

function Login() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
      <div className="outerContainerLogin">
        <div className="innerContainerLogin">
          <h1 className="heading">Login</h1>
          <div>

            {/* The input for the user's chosen name */}
            <input
              className='joinInput'
              placeholder="Name"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>

            {/* The input for the room the user wants to join/make */}
            <input
              className='joinInput'
              placeholder="Room"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link 
            // The onClick prevents a person from accessing the link if there aren't any values for the room and name input
            onClick={event => (!name || !room) ? event.preventDefault(): null}

            // Sends the user to the room with their name and room parameters
            to={`/messenger?name=${name}&room=${room}`}
          >
            <button className='button mt-20' type="submit">Submit</button>
          </Link>
        </div>
      </div>
    );
}

export default Login;