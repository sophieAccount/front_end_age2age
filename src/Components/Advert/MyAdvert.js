import React, { useState, useEffect } from "react";
import "../../Style/MyAdvert.css";
import EditAdvert from './EditAdvert';
import ResponseAdvert from '../ResponseAdvert';
import AdvertFavorite from './AdvertFavorite';
import CreateAdvert from './CreateAdvert';
import Profile from '../User/Profile';

function MyAdvert() {
    const [showEdit, setShowEdit] = useState(0);

    return (
        <div className="MyAdvert">
            <div className="toggle-btn-container">
                <button onClick={() => setShowEdit(0)} className={showEdit === 0 ? "active" : "no-active"}>
                    Editer mes annonces
                </button>
                <button onClick={() => setShowEdit(1)} className={showEdit === 1 ? "active" : "no-active"}>
                    Voir mes messages
                </button>
                <button onClick={() => setShowEdit(2)} className={showEdit === 2 ? "active" : "no-active"}>
                    Annonces favorites
                </button>
                <button onClick={() => setShowEdit(3)} className={showEdit === 3 ? "active" : "no-active"}>
                    Créé une annonce
                </button>
                <button onClick={() => setShowEdit(4)} className={showEdit === 4 ? "active" : "no-active"}>
                    Profile
                </button>
            </div>
            {showEdit === 0 ?
             <EditAdvert />
              : showEdit === 1 ?
             <ResponseAdvert />
             : showEdit === 2 ?
             <AdvertFavorite />
             : showEdit === 3 ?
             <CreateAdvert />
             :
             <Profile />
             }
        </div>
    );
}

export default MyAdvert