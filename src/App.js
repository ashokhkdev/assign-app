import './App.css';
import {Routes,Route} from "react-router-dom"
import {Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './component/Login';
import Signup from './component/Signup';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './component/Home';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <div>
   {/* <Container>
      <Row>
        <Col> */}
        <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        </Routes>
        </UserAuthContextProvider>
        {/* </Col>
        
      </Row>
   </Container> */}
   </div>
 
  );
}

export default App;
