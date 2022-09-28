//import hook useState from react
import { useState } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useNavigate, Link } from "react-router-dom";

function UserCreate() {

    //state
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const navigate = useNavigate();

    //method "storePost"
    const insertUser = async (e) => {
        e.preventDefault();
        
        //send data to server
        await axios.post('http://localhost:3000/api/users/insertUser', {
            nama: nama,
            username: username,
            password: password
        })
        .then((response) => {
           
            navigate("/users");
        })
        .catch((error) => {

            //assign validation on state
            setValidation(error.response.data);
        })
        
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                        
                            {
                                validation.errors &&
                                    <Alert variant="danger">
                                        <ul class="mt-0 mb-0">
                                            { validation.errors.map((error, index) => (
                                                <li key={index}>{ `${error.param} : ${error.message}` }</li>
                                            )) }
                                        </ul>
                                    </Alert>
                            }
                            
                            <Form onSubmit={ insertUser }>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Nama" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>USERNAME</Form.Label>
                                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Username" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>PASSWORD</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    SIMPAN
                                </Button>
                                &nbsp;
                                    <Button as={Link} to={`/users`} variant="warning" size="md" className="me-2">Kembali</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default UserCreate;