import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";

export default function AddPostModal(props) {
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");
    const handleClose = () =>{
        props.onHide();
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const body={
            title:title,
            category:category,
            description,description
        }
        axios.post("https://assignment-e4021-default-rtdb.firebaseio.com/posts.json",body)
        .then((res)=>{
            props.onHide();
            console.log(res);
            setTitle("");
            setCategory("");
            setDescription("");
            props.setTableShow(true);
        })
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Posts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm={2}>
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Title" value={title} 
          onChange={(e)=>{
            console.log(e.target.value);
            setTitle(e.target.value);
            }}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm={2}>Category</Form.Label>
        <Col sm={10}>
        <Form.Select aria-label="Default select example" value={category}
        onChange={(e)=>{
            console.log(e.target.value);
            setCategory(e.target.value);
        }}>
      <option>select</option>
      <option value="Technology">Technology</option>
      <option value="Auto">Auto</option>
      <option value="Finance">Finance</option>
    </Form.Select>
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm={2}>
        Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Description" value={description}
          onChange={(e)=>{
            console.log(e.target.value);
            setDescription(e.target.value);
            }}/>
        </Col>
      </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
      </Modal.Footer>
    </Modal>
  )
}
