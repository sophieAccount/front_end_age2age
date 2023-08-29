import React, { useState } from 'react';
import "../Style/Message.css";
import { Link } from 'react-router-dom';

function Message(props) {
    const { id, name, message } = props.data;

    return (
        <div className="Message">
            <Link to={``}>
                <h2> {name}</h2>
                <p>{message}</p>
            </Link>
        </div>
    );
}

export default Message;