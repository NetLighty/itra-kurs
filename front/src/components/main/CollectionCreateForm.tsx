import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Formik, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Card, Form} from "react-bootstrap";
import {set} from "mobx";


interface CollectionCreateFormProps {
  userId: string

}

const CollectionCreateForm: FC<CollectionCreateFormProps> = ({userId}) => {
  const {store} = useContext(Context)
  const [drag, setDrag] = useState(false)

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>){
    e.preventDefault()
    setDrag(true)
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>){
    e.preventDefault()
    setDrag(false)
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>){
    e.preventDefault()
    // @ts-ignore
    let image = [...e.dataTransfer.files]
    const formData = new FormData()
    // @ts-ignore
    formData.append('file', image)
    console.log(image)
    setDrag(false)
  }

  const validate = Yup.object({
    title: Yup.string()
      .required('Title required'),
    description: Yup.string()
      .required('Description required'),
    theme: Yup.string()
      .required('Theme required'),
  })

  return(
    <div style={{width: '15rem', background: store.theme==='dark' ?
        '#212529' : '#f8f9fa', color: store.theme==='dark' ? '#f8f9fa' : '#212529'}}>
      <Formik
        initialValues={{
          title: '',
          description: '',
          theme: '',
          userId: userId,
          image:''
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          await store.createCollection(values.title, values.description, values.theme, values.userId)
        }}>
        {({handleSubmit, values, handleChange})=> {
          return(<Form onSubmit={handleSubmit}>
            <div>
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                <div
                  className='drop-area'
                  style={{background: drag ? 'white' : 'lightgrey'}}
                  onDragStart={e => dragStartHandler(e)}
                  onDragLeave={e=> dragLeaveHandler(e)}
                  onDragOver={e => dragStartHandler(e)}
                  onDrop={e => onDropHandler(e)}
                >
                  <p
                    className='position-relative start-50 top-50 translate-middle'>
                    Drop files for upload(don't work for now)</p>
                </div>
                <Form.Label className='pt-2'>Title</Form.Label>
                <Form.Control
                  type='text'
                  onChange={handleChange}
                  //onFocus={ ()=> store.setLoginIncorrectUsername(false)}
                  value={values.title}
                  name='title'
                  aria-label="default input example"
                />
                <ErrorMessage className="red" component="div" name="title"/>
              </Form.Group>
            </div>
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                <Form.Label>Theme</Form.Label>
                <Form.Control
                  type='text'
                  onChange={handleChange}
                  //onFocus={ ()=> store.setLoginIncorrectUsername(false)}
                  value={values.theme}
                  name='theme'
                  aria-label="default input example"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                  value={values.description}
                  name='description'
                />
              </Form.Group>
              <button
                //onClick={()=> store.login(username, password)}
                className={store.theme === 'dark' ? 'btn-outline-light btn px-4' : 'btn-outline-dark btn px-4'}
                type="submit">Create
              </button>
          </Form>)
        }}
      </Formik>
    </div>
  );
};

export default observer(CollectionCreateForm);