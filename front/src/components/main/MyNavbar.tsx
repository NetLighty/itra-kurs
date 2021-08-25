import React, {FC, useContext, useState} from 'react'
import {Context} from '../../index'
import {observer} from 'mobx-react-lite'
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'


const MyNavbar: FC = () => {
  const history = useHistory();
  const {store} = useContext(Context)

  const goLogin = () => history.push('/login')

  const logout = async () => {
    history.go(0)
    await store.logout()
  }

  return (
    // @ts-ignore
    <Navbar collapseOnSelect style={{width: 'full'}} expand='lg' bg={store.theme} variant={store.theme}>
      <Container>
        {/*<div onClick={()=>console.log(store.user.role)}> Store userscheme: </div>*/}
        <div>
        <Navbar.Brand href='/home'>
            <svg className='bi bi-collection mx-2' xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' viewBox='0 0 16 16'><path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/></svg>
            My collection
        </Navbar.Brand>
        <Navbar.Brand>
          {store.theme==='dark' ? <svg onClick={() => store.setTheme('light')} style={{ cursor: 'pointer'}}
                                       xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                       className="bi bi-sun mx-2" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg> : <svg onClick={() => store.setTheme('dark')} style={{ cursor: 'pointer'}}
                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        className="bi bi-sun mx-2" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg>}
        </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
           {/* <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>*/}
            {store.isAuth ?
              <div style={{display: 'flex'}}>
                <Nav.Link className='mx-2' style={{cursor: 'default'}}>Logged as:</Nav.Link>
                <Navbar.Brand href={'/users/'+store.user.id}>{store.user.username}({store.user.role})</Navbar.Brand>
              </div> : ''}
          </Nav>
          {store.user.role==='admin' ? <Navbar.Brand href='/table'>Users</Navbar.Brand> : ''}
          <Nav>
            {!store.isAuth ? <Navbar.Brand onClick={goLogin} style={{cursor: 'pointer'}}>Login</Navbar.Brand> :
              <Navbar.Brand onClick={logout} style={{cursor: 'pointer'}}>Logout</Navbar.Brand>
            }
          </Nav>
          <Form className='d-flex m-2'>
            <FormControl
              type='search'
              className='mx-2'
              aria-label='Search'
            />
            <button
              //onClick={()=> store.login(username, password)}
              className={store.theme === 'dark' ? 'btn-outline-light btn' : 'btn-outline-dark btn'}
              > {store.theme==='dark' ?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search"
                   viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search"
                   viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>}
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default observer(MyNavbar);