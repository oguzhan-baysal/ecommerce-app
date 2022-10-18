import React, { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    Box,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useBasket } from '../../context/BasketContext'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postOrder } from "../../api";


function Basket() {

    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { items, removeFromBasket, emptyBasket } = useBasket();
    const total = items.reduce((acc, obj) => acc + Number(obj.price), 0);
    //console.log(typeof total);

    const handleSubmitForm = async (e) => {
        const itemIds = items.map(item => item.id);

        const input = {
            email,
            address,
            items: items
        }

        const response = await postOrder(input);
        emptyBasket()
        
        //console.log("order response:", response);



    }

    return (
        <Box p={5}>
            {items.length < 1 && <Alert status='warning'>You do not have any items in your basket.</Alert>}
            {items.length >= 1 &&
                <>
                    <ul style={{ listStyleType: "decimal" }}>
                        {items.map((item) => (
                            <li key={item.id} style={{ marginBottom: '15px' }}>
                                <Link to={`/product/${item.id}`}>
                                    <Text fontSize='20'>{item.title} - {item.price} $</Text>
                                    <Image width={200} src={item.image} alt="basket item"></Image>
                                </Link>

                                <Button mt={2} size="sm" colorScheme="pink" onClick={() => { removeFromBasket(item.id) }} >
                                    Remove from basket
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <Box mt={10}>
                        <Text fontSize={22}>
                            Total: {total} $
                        </Text>

                        <Button mt={2} size="sm" colorScheme="green" onClick={handleShow} >
                            Order
                        </Button>

                    </Box>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Order Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Address</Form.Label>
                                    <Textarea
                                        rows={3}
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}>
                                    </Textarea>

                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmitForm}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </>

            }


        </Box>
    )
}

export default Basket