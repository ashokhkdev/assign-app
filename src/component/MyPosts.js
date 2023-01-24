import React from 'react'
import axios from "axios"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function MyPosts(props) {

  return (
    <div className='mt-5'>
        <Row className="justify-content-md-center">
           
            {props.posts.map((x)=> <Col lg={3} className="mx-4 mb-4"><Card
          bg="info"
          
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>Title: {x.title}</Card.Header>
          <Card.Body>
            <Card.Title>Category: {x.category} </Card.Title>
            <Card.Text>
              Description: {x.description}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        )}
        
        </Row>

    </div>
  )
}
