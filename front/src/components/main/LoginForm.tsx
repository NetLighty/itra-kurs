import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Formik, ErrorMessage} from "formik"
import * as Yup from "yup"

const LoginForm: FC = () => {
  const {store} = useContext(Context)

  const validate = Yup.object({
    username: Yup.string()
      .required('Username required'),
    password: Yup.string()
      .required('Password required')
  })

  return(
    <section className="vh-100 gradient-custom">
    <div className="index_column pt-5 m-auto" id="app">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="container_spec pt-5">
          <div className="card_spec text-center" style={{width:'18rem', background: store.theme==='dark' ?
              '#212529' : '#f8f9fa', color: store.theme==='dark' ? '#f8f9fa' : '#212529'}}>
            {/*<h3 className=" mb-2 text-uppercase">Login</h3>*/}
              <div className="m-auto">
                <Formik
                  initialValues={{
                    username: '',
                    password: ''
                  }}
                  validationSchema={validate}
                  onSubmit={async (values) => {
                    await store.login(values.username, values.password)
                  }}>
                  {({handleSubmit, values, handleChange})=> {
                    return(<form onSubmit={handleSubmit}>
                      <div className="form-field ">
                        <label className="form-label pt-3" htmlFor="form2Example11">
                          Username
                          <input
                            //onChange={e=>setUsername(e.target.value)}
                            onChange={handleChange}
                            onFocus={ ()=> store.setLoginIncorrectUsername(false)}
                            value={values.username}
                            className="form-control mb-2"
                            type="text"
                            name="username"
                            aria-label="default input example"/>
                          <ErrorMessage className="red" component="div" name="username"/>
                          {store.loginIncorrectUsername ? <a style={{color: 'red'}}>User doesn't exist</a> : ''}
                        </label>
                      </div>
                      <label className="form-label" htmlFor="form2Example11">
                        Password
                        <input
                          //onChange={e=>setPassword(e.target.value)}
                          onChange={handleChange}
                          onFocus={ ()=> store.setLoginIncorrectPassword(false)}
                          value={values.password}
                          className="form-control mb-2"
                          type="password"
                          aria-label="default input example"
                          name="password"/>
                        <ErrorMessage className="red" component="div" name="password"/>
                        {store.loginIncorrectPassword ? <a style={{color: 'red'}}>Password is incorrect</a> : ''}
                      </label>
                      <div className="m-2 ">
                        <button
                          //onClick={()=> store.login(username, password)}
                          className={store.theme === 'dark' ? 'btn-outline-light btn px-4' : 'btn-outline-dark btn px-4'}
                          type="submit">Login
                        </button>
                      </div>
                    </form>)
                  }}
                </Formik>
              </div>
            <div className='pt-1'>
              <a>Don't have account?</a>
              <a href="/registration"
                 className="stretched-link m-2"
                 style={{position: 'relative', color: store.theme==='dark' ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.55)'}}>
                Registration</a>
            </div>
          </div>
       </div>
      </div>
    </div>
    </section>
  );
};

export default observer(LoginForm);