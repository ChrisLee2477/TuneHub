import React from "react";
import Chat from "./Chat";
import ConAndConSide from "./ConAndConWidget";
import { ContactsProvider } from "../contexts/ContactsProvider";
import useLocalStorage from "../hook/LocalStorage";
import { ConversationsProvider } from "../contexts/ConversationsProvider";

export default function Comment() {
  // const [id, setId] = useLocalStorage(id);
  const id = 45456184841;

  const conWid = <ConAndConSide id={id} />;
  return conWid;
}
