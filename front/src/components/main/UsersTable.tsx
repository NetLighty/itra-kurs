import React, {FC, useContext, useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import IUser from '../../models/IUser';
import {observer} from 'mobx-react-lite';
import UserService from '../../services/UserService';
import {Context} from '../../index';
import {Table} from "react-bootstrap";
import UserItem from "../UserItem";
import List from "../List";
/*import List from "../List";
import UserItem from "../UserItem";*/

const UsersTable: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const history= useHistory()
  const {store} = useContext(Context)

  useEffect(()=>{
    /*if(store.user.role !== 'admin'){
      history.push('home')
    }*/
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
    <div style={{}}>
    <Table striped bordered hover variant={store.theme}>
      <thead>
      <tr>
        <th style={{width: '15rem'}}>ID</th>
        <th style={{width: '9rem'}}>Username</th>
        <th style={{width: '12rem'}}>Email</th>
        <th style={{width: '5rem'}}>Status</th>
        <th style={{width: '4rem'}}>Role</th>
        <th>Profile</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user)=>
        <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.role}</td>
        <td><NavLink to={'/users/'+user.id}>Profile.</NavLink></td>
      </tr>)}
      </tbody>
    </Table>
   {/* <List
      items={users}
      renderItem={(user: IUser)=>
        <UserItem
          onClick={(user)=>history.push('/users/'+user.id)}
          user={user}
          key={user.id}
        />}
    />*/}
    </div>
  );
}

export default observer(UsersTable);