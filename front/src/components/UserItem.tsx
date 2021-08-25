import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import IUser from "../models/IUser";

interface UserItemProps {
   user: IUser;
   onClick: (user: IUser) => void;
}

const UserItem: FC<UserItemProps> = ({user, onClick}) => {
  return (
    <div>
    {/*  <div onClick={()=> onClick(user)} style={{padding: 15, border:'1px solid grey'}}>
                {user.id}. {user.username}   Email: {user.email} <NavLink to={'/users/'+user.id}>Profile.</NavLink>
      </div>*/}
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.status}</td>
          <td>{user.role}</td>
          <td><NavLink to={'/users/'+user.id}>Profile.</NavLink></td>
        </tr>
    </div>
  );
};

export default UserItem;