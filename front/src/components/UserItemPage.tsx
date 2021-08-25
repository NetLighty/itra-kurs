import React, {FC, useContext, useEffect, useState} from 'react';
import{useParams, useHistory} from "react-router-dom"
import IUser from "../models/IUser";
import UserService from "../services/UserService";
import CollectionForm from "./main/CollectionForm";
import ICollection from "../models/ICollection";
import CollectionService from "../services/CollectionService";
import CollectionCreateForm from "./main/CollectionCreateForm";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

interface UserItemPageParams {
  id: string;
}

const UserItemPage: FC = () => {

  const [user, setUser] = useState<IUser>()
  const [collections, setCollections]= useState<ICollection[]>()
  const params = useParams<UserItemPageParams>()
  const history= useHistory()
  const {store} = useContext(Context)

  useEffect(()=>{
    getUser()
    getCollections()
  }, [])

  async function getUser(){
    try{
      const response = await UserService.fetchUser(params.id)
      setUser(response.data)
    }
    catch (e){
      console.log(e)
    }
  }

  async function getCollections(){
    try{
      const response = await CollectionService.fetchCollections(params.id)
      setCollections(response.data)
    }
    catch (e){
      console.log(e)
    }
  }

  return (
    /*<section className="vh-100 gradient-custom">
      <div className="index_column pt-5 m-auto" id="app">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="pt-5">
            <div className='card_spec text-center'*/
    <div
      className='pt-2 m-auto justify-content-center align-items-center h-100 text-center'
      style={{width: '100%', background: store.theme==='dark' ?
        '#212529' : '#f8f9fa', color: store.theme==='dark' ? '#f8f9fa' : '#212529'}}>
      <p className='fs-2'>{user?.username}'s Collections</p>
      <div  className='collection-container'>
        {collections?.map((collection)=>
          <div className=''>
          <CollectionForm
            description={collection.description}
            title={collection.title}
            theme={collection.theme}
            picture={collection.picture}
          />
          </div>
        )}
      </div>
      <p className='fs-2' >Create New</p>
      <div className='collection-container'>
        <CollectionCreateForm userId={params.id}/>
      </div>
    </div>
  );
};

export default observer(UserItemPage);