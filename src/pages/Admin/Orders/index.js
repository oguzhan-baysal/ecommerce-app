import React from 'react'
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchOrder } from '../../../api'

function Orders() {

  const { data, isLoading, isError, error } = useQuery(
    "admin:orders",
    fetchOrder
  );

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (isError) {
    return (
      <div>Error {error.message}</div>
    )
  }

  //console.log(data);

  return (
    <div>
      <Text fontSize='2xl'>Orders</Text>

      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>

        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th>Items</Th>
            <Th>Orders</Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            data.map((item) => (
              <Tr key={item}>
                <Td>{item.email}</Td>
                <Td>{item.address}</Td>
                <Td>{item.items.length}</Td>
                <Td>{item.items.map((item,idx) => <li key={idx}>{item.title}</li>)}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </div>
  )
}

export default Orders