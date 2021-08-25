import React, {FC, useContext} from 'react'
import {Card} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import {Context} from "../../index";

interface CollectionProps {
  title: string
  description: string
  theme: string
  picture: string
}

const CollectionForm: FC<CollectionProps> =
  ({
    title,description, theme, picture
  }) => {
    const {store} = useContext(Context)

    return (
      <Card style={{ width: '12rem', background: store.theme==='dark' ?
          '#212529' : '#f8f9fa', color: store.theme==='dark' ? '#f8f9fa' : '#212529'}}>
        <Card.Img variant="top" src={'http://localhost:4444/' + picture} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Description:{description}</Card.Text>
          <Card.Text>Theme: {theme}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

export default observer(CollectionForm);