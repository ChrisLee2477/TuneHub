import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import "./Components.css";

export default function Contacts() {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
