import {BrowserRouter, Route, Redirect, NavLink} from 'react-router-dom'
import UserPage from './components/UserPage'
import UserItemPage from './components/UserItemPage'
import LoginForm from './components/main/LoginForm'
import UsersTable from './components/main/UsersTable'
import RegistrationForm from './components/main/RegistrationForm'
import {FC, useContext, useEffect, useState} from 'react'
import {Context} from './index'
import {observer} from 'mobx-react-lite'
import {Spinner} from 'react-bootstrap'
import MyNavbar from './components/main/MyNavbar'


const App: FC = () => {
  const {store} = useContext(Context)

  useEffect(()=> {
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
    console.log('userRole: '+store.user.role)
    console.log('userStatus: '+store.user.status)
    console.log('userTheme: '+store.user.theme)
    console.log('userID: '+store.user.id)
    const theme=localStorage.getItem('theme')
    if(theme!==null){
      store.setTheme(theme)
    }
  }, [])

  if(store.isLoading){
    return <div className='position-absolute start-50 top-50 translate-middle fs-2'>Loading...
      <Spinner animation='border' role='status'>
    </Spinner>
    </div>
  }

  return (
    <BrowserRouter>
      <div>
        <MyNavbar/>
        <Route path={'/profile/:id'} exact>
          <UserItemPage/>
        </Route>
        <Route path={'/profile/collection/:id'} exact>
          <UserItemPage/>
        </Route>
        <Route path={'/table'} exact>
          <UsersTable/>
        </Route>
        <Route path={'/users'} exact>
          <UserPage/>
        </Route>
        <Route path={'/users/:id'} exact>
          {/*{(store.user.role==='admin' || store.user.id===':id') ? <UserItemPage/> : <Redirect to={'/home'}/>}*/}
          <UserItemPage/>
        </Route>
        <Route path={'/login'} exact>
          {store.isAuth ? <Redirect to='/home'/> : <LoginForm/>}
        </Route>
        <Route path={'/registration'} exact>
          {store.isAuth ? <Redirect to='/home'/> : <RegistrationForm/>}
        </Route>
      </div>
      <div>
      </div>
    </BrowserRouter>
  );
};

export default observer(App);
