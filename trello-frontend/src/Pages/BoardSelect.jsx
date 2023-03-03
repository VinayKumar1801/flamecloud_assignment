import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BoardSelect = () => {
    const [boards, setBoards] = useState([]);
  
    useEffect(() => {
      const fetchBoards = async () => {
        try {
          const response = await axios.get(
            "https://api.trello.com/1/members/me/boards",
            {
              params: {
                key: "731c07ee2838d6697583186746311876",
                token:
                  "ATTAbabdcd1c0fc03185bf0f4e8876a64bdc6b1580ca7c0f8fea20f6196f7c06d7d6497D7F89",
              },
            }
          );
          const boards = response.data.map((board) => ({
            id: board.id,
            name: board.name,
          }));
          setBoards(boards);
        } catch (error) {
          console.error(error);
        }
      };

      fetchBoards();
    }, []);
    console.log(boards)


    return (
      <>
        <Box bg="red.500" py="4">
          <Container
            maxW="container.lg"
            display="flex"
            justify="space-between"
            align="center"
          >
            <Flex justifyContent={"space-between"} width="100%">
              <Link to="/">
                <Button colorScheme={"red"}>Trello Board Viewer</Button>
              </Link>
              <Link to="/createboard">
                <Button colorScheme={"red"}>Add Board</Button>
              </Link>
            </Flex>
          </Container>
        </Box>
        <Table width={"75%"} margin="auto" variant="simple">
          <Thead>
            <Tr>
              <Th>Board Name</Th>
              <Th>Board ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boards.map((board) => (
              <Tr key={board.id}>
                <Td>{board.name}</Td>
                <Td>{board.id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
  };



export default BoardSelect;
