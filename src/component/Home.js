import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import "./home.css"
import AddPostModal from './AddPostModal';
import MyPosts from './MyPosts';
import axios from "axios"
import Posts from './Posts';
import { async } from '@firebase/util';
export default function Home() {
    const [modalShow, setModalShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [tableShow, setTableShow] = useState(false);
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("");

    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("https://assignment-e4021-default-rtdb.firebaseio.com/posts.json")
            .then((res) => {
                console.log(res.data);
                const posts = [];
                for (let key in res.data) {
                    posts.push({ ...res.data[key], id: key })
                }
                console.log(posts);
                setPosts(posts);
            })
    }, [tableShow])
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleMyPosts = async () => {
        await axios.get("https://assignment-e4021-default-rtdb.firebaseio.com/posts.json")
            .then((res) => {
                console.log(res.data);
                const posts = [];
                for (let key in res.data) {
                    posts.push({ ...res.data[key], id: key })
                }
                console.log(posts);
                setPosts(posts);
            })
        setTableShow(true);
    }
    const handleSearch =async (e) => {
        e.preventDefault();
         let temp = [...posts];
        const result = temp.filter((x) => x.title.toLowerCase().includes(input.toLocaleLowerCase()));
        setPosts(result);
        setInput("");
    }
    const handleFilter = (e) => {
        console.log(e.target.value);
        setCategory(e.target.value);
        let temp=[...posts]
        const result=temp.filter((x)=>x.category.toLocaleLowerCase()===e.target.value.toLocaleLowerCase());
        setPosts(result);
    }
    const onReset=()=>{
        axios.get("https://assignment-e4021-default-rtdb.firebaseio.com/posts.json")
        .then((res) => {
            console.log(res.data);
            const posts = [];
            for (let key in res.data) {
                posts.push({ ...res.data[key], id: key })
            }
            console.log(posts);
            setPosts(posts);
        })
    }
    return (
        <div>


            <Navbar bg="info" >

                <Container>
                    <Navbar.Brand href="#home">My App</Navbar.Brand>
                    <button onClick={handleLogout}>logout</button>
                </Container>
                {/* <button>logout</button> */}

            </Navbar>

            <div>
                <Row className="justify-content-md-center">
                    <Col lg="4">
                        <div className="p-4 box mt-5">
                            <div><button style={{ width: "100%" }} onClick={() => setModalShow(true)}>Add post</button></div>
                            <div className='my-2'><button style={{ width: "100%" }} onClick={handleMyPosts}>My post</button></div>

                        </div>
                    </Col>
                </Row>
            </div>
            <Container>
                
            {!tableShow&& <div>
                    <h5>Search by title</h5>
                    <form onSubmit={handleSearch}>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className='mx-2'>search</button>
                        <button onClick={onReset}>Reset</button>
                    </form>
                    
                </div>}
                {!tableShow&&<div>
                    <h5>Filter by category</h5>
                    <select aria-label="Default select example" value={category} className="p-1"
                        onChange={handleFilter}>
                        <option>select</option>
                        <option value="Technology">Technology</option>
                        <option value="Auto">Auto</option>
                        <option value="Finance">Finance</option>
                    </select>
                    <button className='mx-2' onClick={onReset}>Reset</button>
                </div>}

            </Container>
            <AddPostModal show={modalShow} onHide={() => setModalShow(false)} setTableShow={setTableShow} />
            <Container>
                <div className='mt-5'>
                    {!tableShow && <MyPosts posts={posts} />}
                    {tableShow && <Posts posts={posts} />}

                </div>

            </Container>

        </div>
    )
}
