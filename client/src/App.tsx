import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function App() {
  const [link, setLink] = useState('');
  const [postError, setPostError] = useState('');
  const handleChange = (event: React.FormEvent): void => {
    setLink((event.target as HTMLInputElement).value);
  };
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const url = '/youtube';
    axios
      .post(url, {
        youtubelink: link,
      })
      .then((re) => {
        setLink('');
        setPostError('');
        (event.target as HTMLFormElement).reset();
      })
      .catch((e) => {
        setPostError(e.response.data.message);
      });
  };
  return (
    <div className="App">
      <Form className="text-start m-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Youtube Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter link"
            value={link}
            onChange={handleChange}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h4 style={{ color: 'red' }}>{postError ?? postError}</h4>
    </div>
  );
}

export default App;
