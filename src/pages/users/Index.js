import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

function UserIndex() {
    const [users, setPosts] = useState([]);
    useEffect(() => {
        fectData();
    }, []);
    const fectData = async () => {
        const response = await axios.get('http://localhost:3000/api/users/dataUsers');
        const data = await response.data.data;
        setPosts(data);
    }
    const deleteUser = async (user_id) => {
    await axios.delete(`http://localhost:3000/api/users/deleteUser/${user_id}`);
    fectData();
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/users/create" variant="success" className="mb-3">TAMBAH USER</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                    <tr>
                                        <th>NO.</th>
                                        <th>NAMA</th>
                                        <th>USERNAME</th>
                                        <th>AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { users.map((user, index) => (
                                        <tr key={ user.user_id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ user.nama }</td>
                                            <td>{ user.username }</td>
                                            <td className="text-center">
                                                <Button as={Link} to={`/users/edit/${user.user_id}`} variant="primary" size="sm" className="me-2">EDIT</Button> &nbsp;
                                                <Button onClick={() => deleteUser(user.user_id)} variant="danger" size="sm">DELETE</Button>
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserIndex;