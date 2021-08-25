import React, {FC, useContext, useEffect, useState} from 'react';
import UserItem from "./UserItem";
import List from "./List";
import {useHistory} from "react-router-dom"
import IUser from "../models/IUser";
import {observer} from "mobx-react-lite";
import UserService from "../services/UserService";
import {Context} from "../index";

const UserPage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const history= useHistory()
  const {store} = useContext(Context)

  useEffect(()=>{
    if(store.user.role !== 'admin'){
      history.push('home')
    }
    console.log('userRole: '+store.user.role)
    console.log('userStatus: '+store.user.status)
    console.log('userTheme: '+store.user.theme)
    console.log('userID: '+store.user.id)
    getUsers()
  }, [])

  async function getUsers(){
    try{
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    }
    catch (e){
      alert(e)
    }
  }

  return (
    <List
      items={users}
      renderItem={(user: IUser)=>
        <UserItem
          onClick={(user)=>history.push('/users/'+user.id)}
          user={user}
          key={user.id}
        />}
    />
  );
}

export default observer(UserPage);