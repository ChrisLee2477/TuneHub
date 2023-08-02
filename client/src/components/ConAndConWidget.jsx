import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./newContactModal";
import NewConversationModal from "./newConversationModal";
import "./Components.css";

const convoKey = "converstions";
const contKey = "contacts";

function ConAndConSide({ id }) {
  const [activeKey, setActiveKey] = useState(convoKey);
  const [modalOpen, setModalOpen] = useState(false);
  const converstionsOpen = activeKey === convoKey;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className=" d-flex  flex-column ">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center dash">
          <Nav.Item>
            <Nav.Link eventKey={convoKey}>Converstions</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contKey}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1 dash">
          <Tab.Pane eventKey={convoKey}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={contKey}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small ">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-0 ">
          New {converstionsOpen ? "Converstion" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {converstionsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default ConAndConSide;
