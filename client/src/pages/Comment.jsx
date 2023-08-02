import React from "react";
import TextArea from "../components/TextArea";
import OpenConversation from "../components/OpenConversation";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Comment(id) {
  const { selectConversation } = useConversations();
  console.log(useConversations());
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <TextArea id={id} />
      {selectConversation?.selected && <OpenConversation />}
    </div>
  );
}
