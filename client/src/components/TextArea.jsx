import React, { useState } from "react";
import ConAndConSide from "./ConAndConWidget";
import Auth from "../utils/auths";

export default function Comment() {
  // const [id, setId] = useLocalStorage(id);
  const [id, setId] = useState();

  const conWid = <ConAndConSide id={id} />;
  return conWid;
}
