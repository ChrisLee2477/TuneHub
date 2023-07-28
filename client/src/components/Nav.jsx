import Form from "react-bootstrap/Form";

export default function Nav() {
  return (
    <Form.Select aria-label="Default select example">
      <option>TunesHub</option>
      <option value="1">Login</option>
      <option value="2">Search</option>
      <option value="3">Playlist</option>
      <option value="3">Friends</option>
    </Form.Select>
  );
}
