import React, { useEffect, useState } from "react";
import Home from "../Components/Home";
import Profile from "../Components/User/Profile";
import Connexion from "../Components/Login/Connexion";
import Inscription from "../Components/User/Inscription";
import CreateAdvert from '../Components/Advert/CreateAdvert';
import OneAdvert from '../Components/Advert/OneAdvert';
import ModifyAdvert from '../Components/Advert/ModifyAdvert';
import { Routes, Route } from "react-router-dom";
import CategoriesList from "../Components/Categories/Categories-List";
import AddCategory from "../Components/Categories/AddCategory";
import OneCategory from "../Components/Categories/OneCategory";
import { AuthContext, useAuthContext } from "../Context/AuthProvider";
import UpdateCategory from "../Components/Categories/UpdateCategory";
import Admin from "../Components/Admin";
import EditAdvert from "../Components/Advert/EditAdvert";
import OneRole from "../Components/Role/OneRole";
import RoleList from "../Components/Role/RoleList";
import AddRole from "../Components/Role/AddRole";
import CommentList from "../Components/Comments/CommentList";
import OneComment from "../Components/Comments/OneComment";
import AddComment from "../Components/Comments/AddComment";
import UpdateComment from "../Components/Comments/UpdateComment";
import MessageList from "../Components/Message/MessageList";
import OneMessage from "../Components/Message/OneMessage";
import AddMessage from "../Components/Message/AddMessage";
import AdvertList from "../Components/Advert/AdvertList";
import AdvertValidate from "../Components/Advert/AdvertValidate";
import AdvertDetailAdmin from "../Components/Advert/AdvertDetailAdmin";
import UsersList from "../Components/User/UsersList";
import UserDetailAdmin from "../Components/User/UserDetailAdmin";
import AdvertDetail from "../Components/Advert/AdvertDetail";
import MyAdverts from "../Components/Advert/MyAdverts";
import UpdateRole from "../Components/Role/UpdateRole";
import MyMessages from "../Components/Message/MyMessages";
import MyComments from "../Components/Comments/MyComments";
import MyProfile from "../Components/User/MyProfile";
import AllCategories from "../Components/Categories/AllCategories";
import Category from "../Components/Categories/Category";
import ValidateComment from "../Components/Comments/ValidateComment";

function AllRoutes() {
    const tokenAccess = localStorage.getItem("auth");
    const [token, setToken] = useState({});
    const [data, setUserData] = useState({});
    const [userId, setUserId] = useState({});

    const { config } = useAuthContext();

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem("auth") ? localStorage.getItem("auth").replace(/"/g, '') : '';
        const userId = localStorage.getItem("userId") ? localStorage.getItem("userId").replace(/"/g, '') : '';
        const headers = { 'Authorization': `Bearer ${token}` };
        let response = await fetch(`https://${config}/users/${userId}`, { headers })
        response = await response.json();
        setUserData(response);
        setToken(token);
    }
    console.log(data);
    useEffect(() => {
        fetchCurrentUser();
    }, {});

    const userData = data[0] ? data[0] : '';
    console.log(userData.role_type);

    return (
        <>
            {
                !tokenAccess ?
                    <Routes>
                        <Route exact path="/connexion" element={<Connexion />} />
                        <Route exact path="/inscription" element={<Inscription />} />
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/AdvertDetails/:id" element={<AdvertDetail />} />
                        <Route exact path="/AllCategories" element={<AllCategories />} />
                        <Route exact path="/Category/:id" element={<Category />} />
                    </Routes>
                    :
                    <AuthContext.Provider
                        value={{
                            token: token,
                            userData: data,
                            setToken: setToken,
                            setUserData: fetchCurrentUser,
                            userId: userId,
                            setUserId: setUserId,
                        }}
                    > {tokenAccess && (userData.role_type == "user") ? (
                        <Routes>
                            <Route exact path="/Category/:id" element={<Category />} />
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/AllCategories" element={<AllCategories />} />
                            <Route exact path="/profile" element={<Profile />} />
                            <Route exact path="/MyAdverts" element={<MyAdverts />} />
                            <Route exact path="/MyMessages" element={<MyMessages />} />
                            <Route exact path="/AdvertDetailAdmin/:id" element={<AdvertDetailAdmin />} />
                            <Route exact path="/MyComments" element={<MyComments />} />
                            <Route exact path="/MyProfile" element={<MyProfile />} />
                            <Route exact path="/CreateAdvert" element={<CreateAdvert />} />
                            <Route exact path="/UpdateAdvert" element={<EditAdvert />} />
                            <Route exact path="/advert/:id" element={<OneAdvert />} />
                            <Route exact path="/modifyAdvert/:id" element={<ModifyAdvert />} />
                            <Route exact path="/Admin" element={<Admin />} />
                            <Route exact path="/OneComment/:id" element={<OneComment />} />
                            <Route exact path="/AddComment" element={<AddComment />} />
                            <Route exact path="/UpdateComment/:id" element={<UpdateComment />} />
                            <Route exact path="/OneMessage/:id" element={<OneMessage />} />
                            <Route exact path="/AddMessage" element={<AddMessage />} />
                            <Route exact path="/AdvertDetails/:id" element={<AdvertDetail />} />

                        </Routes>
                    ) : (

                        null
                    )}
                        {tokenAccess && (userData.role_type == "modérateur") ? (
                            <Routes>
                                <Route exact path="/Category/:id" element={<Category />} />
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/AllCategories" element={<AllCategories />} />
                                <Route exact path="/profile" element={<Profile />} />
                                <Route exact path="/MyAdverts" element={<MyAdverts />} />
                                <Route exact path="/MyMessages" element={<MyMessages />} />
                                <Route exact path="/AdvertDetailAdmin/:id" element={<AdvertDetailAdmin />} />
                                <Route exact path="/MyComments" element={<MyComments />} />
                                <Route exact path="/MyProfile" element={<MyProfile />} />
                                <Route exact path="/CreateAdvert" element={<CreateAdvert />} />
                                <Route exact path="/UpdateAdvert" element={<EditAdvert />} />
                                <Route exact path="/Messages" element={<MessageList />} />
                                <Route exact path="/advert/:id" element={<OneAdvert />} />
                                <Route exact path="/modifyAdvert/:id" element={<ModifyAdvert />} />
                                <Route exact path="/Admin" element={<Admin />} />
                                <Route exact path="/OneComment/:id" element={<OneComment />} />
                                <Route exact path="/AddComment" element={<AddComment />} />
                                <Route exact path="/UpdateComment/:id" element={<UpdateComment />} />
                                <Route exact path="/OneMessage/:id" element={<OneMessage />} />
                                <Route exact path="/AddMessage" element={<AddMessage />} />
                                <Route exact path="/AdvertDetails/:id" element={<AdvertDetail />} />
                                <Route exact path="/Comments" element={<CommentList />} />
                                <Route exact path="/AdvertList" element={<AdvertList />} />
                                <Route exact path="/AdvertValidate" element={<AdvertValidate />} />
                                <Route exact path="/ValidateComment" element={<ValidateComment />} />
                            </Routes>
                        ) : (

                            null
                        )}
                        {tokenAccess && (userData.role_type == "admin") ? (

                            <Routes>
                                <Route exact path="/Category/:id" element={<Category />} />
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/AllCategories" element={<AllCategories />} />
                                <Route exact path="/profile" element={<Profile />} />
                                <Route exact path="/CreateAdvert" element={<CreateAdvert />} />
                                <Route exact path="/advert/:id" element={<OneAdvert />} />
                                <Route exact path="/modifyAdvert/:id" element={<ModifyAdvert />} />
                                <Route exact path="/categories" element={<CategoriesList />} />
                                <Route exact path="/AddCategory" element={<AddCategory />} />
                                <Route exact path="/OneCategory/:id" element={<OneCategory />} />
                                <Route exact path="/UpdateCategory/:id" element={<UpdateCategory />} />
                                <Route exact path="/UpdateRole/:id" element={<UpdateRole />} />
                                <Route exact path="/Admin" element={<Admin />} />
                                <Route exact path="/MyProfile" element={<MyProfile />} />
                                {/* <Route exact path="/Roles" element={<RoleList />} /> */}
                                {/* <Route exact path="/Onerole/:id" element={<OneRole />} /> */}
                                {/* <Route exact path="/AddRole" element={<AddRole />} /> */}
                                <Route exact path="/Comments" element={<CommentList />} />
                                <Route exact path="/OneComment/:id" element={<OneComment />} />
                                <Route exact path="/AddComment" element={<AddComment />} />
                                <Route exact path="/UpdateComment/:id" element={<UpdateComment />} />
                                <Route exact path="/Messages" element={<MessageList />} />
                                <Route exact path="/OneMessage/:id" element={<OneMessage />} />
                                <Route exact path="/AddMessage" element={<AddMessage />} />
                                <Route exact path="/AdvertList" element={<AdvertList />} />
                                <Route exact path="/AdvertValidate" element={<AdvertValidate />} />
                                <Route exact path="/AdvertDetailAdmin/:id" element={<AdvertDetailAdmin />} />
                                <Route exact path="/AdvertDetails/:id" element={<AdvertDetail />} />
                                <Route exact path="/UsersList" element={<UsersList />} />
                                <Route exact path="/UserDetailAdmin/:id" element={<UserDetailAdmin />} />
                                <Route exact path="/ValidateComment" element={<ValidateComment />} />
                            </Routes>
                        ) : (
                            null
                        )
                        }
                        {tokenAccess && (userData.role_type == "super_admin") ? (

                            <Routes>
                                <Route exact path="/Category/:id" element={<Category />} />
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/AllCategories" element={<AllCategories />} />
                                <Route exact path="/profile" element={<Profile />} />
                                <Route exact path="/CreateAdvert" element={<CreateAdvert />} />
                                <Route exact path="/advert/:id" element={<OneAdvert />} />
                                <Route exact path="/modifyAdvert/:id" element={<ModifyAdvert />} />
                                <Route exact path="/categories" element={<CategoriesList />} />
                                <Route exact path="/AddCategory" element={<AddCategory />} />
                                <Route exact path="/OneCategory/:id" element={<OneCategory />} />
                                <Route exact path="/UpdateCategory/:id" element={<UpdateCategory />} />
                                <Route exact path="/UpdateRole/:id" element={<UpdateRole />} />
                                <Route exact path="/Admin" element={<Admin />} />
                                <Route exact path="/Roles" element={<RoleList />} />
                                <Route exact path="/Onerole/:id" element={<OneRole />} />
                                <Route exact path="/AddRole" element={<AddRole />} />
                                <Route exact path="/Comments" element={<CommentList />} />
                                <Route exact path="/OneComment/:id" element={<OneComment />} />
                                <Route exact path="/AddComment" element={<AddComment />} />
                                <Route exact path="/UpdateComment/:id" element={<UpdateComment />} />
                                <Route exact path="/Messages" element={<MessageList />} />
                                <Route exact path="/OneMessage/:id" element={<OneMessage />} />
                                <Route exact path="/AddMessage" element={<AddMessage />} />
                                <Route exact path="/MyProfile" element={<MyProfile />} />
                                <Route exact path="/AdvertList" element={<AdvertList />} />
                                <Route exact path="/AdvertValidate" element={<AdvertValidate />} />
                                <Route exact path="/AdvertDetailAdmin/:id" element={<AdvertDetailAdmin />} />
                                <Route exact path="/AdvertDetails/:id" element={<AdvertDetail />} />
                                <Route exact path="/UsersList" element={<UsersList />} />
                                <Route exact path="/UserDetailAdmin/:id" element={<UserDetailAdmin />} />
                                <Route exact path="/ValidateComment" element={<ValidateComment />} />
                            </Routes>
                        ) : (
                            null
                        )
                        }
                    </AuthContext.Provider >
            }
        </>
    )
}

export default AllRoutes