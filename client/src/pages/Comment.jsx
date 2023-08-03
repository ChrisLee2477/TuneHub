import React from "react";
import TextArea from "../components/TextArea";
import OpenConversation from "../components/OpenConversation";
import { useConversations } from "../contexts/ConversationsProvider";
import { useNavigate } from "react-router-dom";

export default function Comment(id) {
  const { selectConversation } = useConversations();
  console.log(useConversations());
  const navigate = useNavigate();
  function returnLogin() {
    navigate("/");
  }

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <button className="home" onClick={(e) => returnLogin()}>
        Home
      </button>
      <TextArea id={id} />
      {selectConversation?.selected && <OpenConversation />}
    </div>
  );
}
