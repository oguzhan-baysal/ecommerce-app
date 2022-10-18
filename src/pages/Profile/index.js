import React from 'react'
import { useAuth } from '../../context/AuthContext'
import {
    Text, Button, TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Profile() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout(() => {
            navigate('/')
        });
    };

    return (
        <div>
            {/* <Text fontSize={22}>Profile</Text>
            <code>{JSON.stringify(user)}</code> */}

            <TableContainer>
                <Table size="lg" fontSize="md">
                    <Thead>
                        <Tr>
                            <Th>User Id</Th>
                            <Th>E-mail</Th>
                            <Th isNumeric>Password</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{user.id}</Td>
                            <Td>{user.email}</Td>
                            <Td isNumeric>{user.password}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <br />
            <br />

            <Button colorScheme='pink' variant='solid' onClick={handleLogout} >Log Out</Button>
        </div>
    )
}

export default Profile