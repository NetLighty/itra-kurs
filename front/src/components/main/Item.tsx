import React, {FC, useContext} from 'react';
import {Button, Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

interface ItemProps {
  title: string;
  tags: string;
  onClick: (num: number)=> void;
}

const Item: FC<ItemProps> =
  ({

  }) => {

    const {store} = useContext(Context)

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title> {store.theme} Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default observer(Item);