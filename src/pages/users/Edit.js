import { useState, useEffect } from 'react';
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

function UserEdit() {

    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');;

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const navigate = useNavigate();

    //get ID from parameter URL
    const { user_id } = useParams();

    useEffect(() => {
        getUserById();
        
    }, []);

    const getUserById = async() => {

        const response = await axios.get(`http://localhost:3000/api/users/detailUser/${user_id}`);
        const data = await response.data.data

        setNama(data.nama);
        setUsername(data.username);
        setPassword(data.password)
    };
    const updateUser = async (e) => {
        e.preventDefault();
        
        await axios.patch(`http://localhost:3000/api/users/updateUser/${user_id}`, {
            nama: nama,
            username: username,
            password: password
        })
        .then(() => {

            navigate("/users");

        })
        .catch((error) => {
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

                            <Form onSubmit={ updateUser }>
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
                                    UPDATE
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
export default UserEdit;