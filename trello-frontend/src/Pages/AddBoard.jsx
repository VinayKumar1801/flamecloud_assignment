import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
} from "@chakra-ui/react";
import { createBoard } from "../utils/trello";
import {Link} from "react-router-dom"
const AddBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [trelloApiKey, setTrelloApiKey] = useState("");
  const [trelloToken, setTrelloToken] = useState("");
const [data,setData]= useState({})
  const handleCreateBoard = async () => {
    const response = await createBoard(boardName, trelloApiKey, trelloToken);
    // console.log(response);
    setData(response)
  };
console.log(data)
  return (
    <Box>
      <Box bg="red.500" py="4">
        <Container
          maxW="container.lg"
          display="flex"
          justify="space-between"
          align="center"
        >
          <Flex width={"100%"} justifyContent="space-between">
            <Link to="/">
              <Button colorScheme={"red"}>Trello Board Viewer</Button>
            </Link>
            <Link to="/selectboard">
              <Button colorScheme={"red"}>All Boards</Button>
            </Link>
          </Flex>
        </Container>
      </Box>
      <Flex direction="column" align="center" justify="center" margin={"20px"}>
        <Box bg="white" boxShadow="lg" p={8} borderRadius="md">
          <FormControl mb={4} isRequired>
            <FormLabel>Trello API Key</FormLabel>
            <Input
              type="text"
              value={trelloApiKey}
              isRequired
              onChange={(e) => setTrelloApiKey(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Trello Token</FormLabel>
            <Input
              type="text"
              value={trelloToken}
              isRequired
              onChange={(e) => setTrelloToken(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Board Name</FormLabel>
            <Input
              type="text"
              value={boardName}
              isRequired
              onChange={(e) => setBoardName(e.target.value)}
            />
          </FormControl>
          <Button mb={4} colorScheme="red" onClick={handleCreateBoard}>
            Create Board
          </Button>
        </Box>
      </Flex>
      {Object.keys(data).length === 0 ? (
        <Box>
          <Heading textAlign={"center"} size="xl">
            Create a Board
          </Heading>
        </Box>
      ) : (
        <Box marginTop={"10px"}>
          <TableContainer width={"75%"} margin="auto">
            <Table variant="simple" textAlign={"center"}>
              <Thead>
                <Tr>
                  <Th>Board Name</Th>
                  <Th>Board Id</Th>
                  <Th>URL</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{data.name}</Td>
                  <Td>{data.id}</Td>
                  <Td>{data.shortUrl}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
export default AddBoard