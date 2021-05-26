import React from 'react';

function Header( {room} ) {
    return (
        <div className='header'>
            <div className='leftInnerContainer'>
                {/* The name of the room */}
                <h3>{room}</h3>
            </div>
            <div className='rightInnerContainer'>
                {/* Link back to home page */}
                <a href="/">CLOSE</a>
            </div>
        </div>
    );
}

export default Header;