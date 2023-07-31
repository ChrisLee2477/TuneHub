import React from "react";
import Chat from "../components/Chat";
import ConAndConSide from "../components/ConAndConWidget";
import { ContactsProvider } from "../contexts/ContactsProvider";
import useLocalStorage from "../hook/LocalStorage";
import { ConversationsProvider } from "../contexts/ConversationsProvider";

export default function Comment() {
  // const [id, setId] = useLocalStorage(id);
  const id = 45456184841;

  const conWid = (
    <ContactsProvider>
      <ConversationsProvider>
        <ConAndConSide id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );
  return conWid;
}
