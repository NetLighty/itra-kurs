import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Formik} from "formik";

const RegistrationForm: FC = () => {
  /*const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')*/
  const {store} = useContext(Context)
  const history = useHistory();

  const validate = Yup.object({
    username: Yup.string()
      .required('Username required'),
    email: Yup.string()
      .required('Email required')
      .email('Incorrect email form'),
    confirmPassword: Yup.string()
      .required('Confirm required')
      .oneOf([Yup.ref('password'),null], 'Password must match'),
    password: Yup.string()
      .required('Password required')
  })

  return (
    <section className="vh-100 gradient-custom">
      <div className="index_column pt-5 m-auto" id="app">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="pt-5">
            <div className='card_spec text-center' style={{width:'18rem', background: store.theme==='dark' ?
                '#212529' : '#f8f9fa', color: store.theme==='dark' ? '#f8f9fa' : '#212529'}}>
                <div className="m-auto">
                  <Formik
                    initialValues={{
                      username: '',
                      email:'',
                      password: '',
                      confirmPassword:''
                    }}
                    validationSchema={validate}
                    onSubmit={async (values) => {
                      await store.registration(values.username, values.email, values.password)
                    }}>
                    {({handleSubmit, values, handleChange})=> {
                      return(<form onSubmit={handleSubmit}>
                        <div className="form-field ">
                          <label className="form-label pt-3" htmlFor="form2Example11">
                            Username
                            <input
                              //onChange={e=>setUsername(e.target.value)}
                              onChange={handleChange}
                              onFocus={ ()=> store.setRegistrationUsernameExist(false)}
                              value={values.username}
                              className="form-control pb-1"
                              type="text"
                              name="username"
                              aria-label="default input example"/>
                            <ErrorMessage className="red" component="div" name="username"/>
                            {store.registrationUsernameExist ? <a style={{color: 'red'}}>Username already exist</a> : ''}
                          </label>
                        </div>
                        <label className="form-label" htmlFor="form2Example11">
                          Email
                          <input
                            //onChange={e=>setPassword(e.target.value)}
                            onChange={handleChange}
                            onFocus={ ()=> store.setRegistrationEmailExist(false)}
                            value={values.email}
                            className="form-control pb-1"
                            /*type="email"*/
                            aria-label='default input example'
                            name='email'
                          />
                          <ErrorMessage className="red" component="div" name="email"/>
                          {store.registrationEmailExist ? <a style={{color: 'red'}}>Email already exist</a> : ''}
                        </label>
                        <label className="form-label" htmlFor="form2Example11">
                          Password
                          <input
                            //onChange={e=>setPassword(e.target.value)}
                            onChange={handleChange}
                            value={values.password}
                            className="form-control pb-1"
                            type="password"
                            aria-label="default input example"
                            name="password"/>
                          <ErrorMessage className="red" component="div" name="password"/>
                        </label>
                        <label className="form-label" htmlFor="form2Example11">
                          Confirm password
                          <input
                            //onChange={e=>setPassword(e.target.value)}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            className="form-control pb-1"
                            type="password"
                            aria-label="default input example"
                            name="confirmPassword"/>
                          <ErrorMessage className="red" component="div" name="confirmPassword"/>
                        </label>
                        <div className="m-2 pt-2">
                          <button
                            className={store.theme === 'dark' ? 'btn-outline-light btn px-4' : 'btn-outline-dark btn px-4'}
                            type="submit">Registration
                          </button>
                        </div>
                      </form>)
                    }}
                  </Formik>
                </div>
             {/* </form>*/}
              <div className='pt-1'>
                <a>Already have account?</a>
                <a href="/login"
                   className="stretched-link px-2"
                   style={{position: 'relative', color: store.theme==='dark' ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.55)'}}>
                  Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(RegistrationForm);