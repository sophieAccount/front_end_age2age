import React, {  } from "react";
import "../Style/ResponseAdvert.css";
import Message from './Message';

function ResponseAdvert() {

    // const [adverts, setMessage] = useState("");

    // useEffect(() => {
    //     fetch("http://${process.env.REACT_APP_MY_URL}/messages/getAll")
    //     .then((res) => res.json())
    //     .then((res) => {
    //         setMessage(res.adverts);
    //     });
    // }, []);

    const message = [
        {
            id: 1,
            name: 'Item 1',
            message: 'Description 1',
        },
        {
            id: 2,
            name: 'Item 2',
            message: 'Description 2',
        },
        {
            id: 3,
            name: 'Item 3',
            message: 'Description 3',
        },
        {
            id: 4,
            name: 'Item 4',
            message: 'Description 4',
        },
        {
            id: 5,
            name: 'Item 5',
            message: 'Description 5',
        },
        {
            id: 6,
            name: 'Item 6',
            message: 'Description 6',
        },
    ];

    const myMessages = message.map(message => {
        return <Message key={message.id} data={message} />
    });

    return (
        <div className="ResponseAdvert">
            <div className="MyMessages">
                {myMessages}
            </div>
        </div>
    )
}

export default ResponseAdvert