import { useState } from "react";
import { Box, Container, Input, Button, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import Board from "../Board";
import { Link } from "react-router-dom";
const Boards = () => {
  const [boardId, setBoardId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [showBoard, setShowBoard] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowBoard(true);
  };

  return (
    <Box>
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
            <Link to="/selectboard">
              <Button colorScheme={"red"}>All Boards</Button>
            </Link>
          </Flex>
        </Container>
      </Box>
      <Box maxW="800px" mx="auto" my="8" boxShadow="lg" p={8} borderRadius="md">
        {!showBoard ? (
          <form onSubmit={handleFormSubmit}>
            <FormControl id="board-id" isRequired mb="4">
              <FormLabel>Board ID</FormLabel>
              <Input
                placeholder="Enter Trello board ID"
                value={boardId}
                onChange={(event) => setBoardId(event.target.value)}
              />
            </FormControl>
            <FormControl id="api-key" isRequired mb="4">
              <FormLabel>API Key</FormLabel>
              <Input
                placeholder="Enter Trello API key"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
              />
            </FormControl>
            <FormControl id="api-token" isRequired mb="4">
              <FormLabel>API Token</FormLabel>
              <Input
                placeholder="Enter Trello API token"
                value={apiToken}
                onChange={(event) => setApiToken(event.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="red">
              View Board
            </Button>
          </form>
        ) : (
          <Board boardId={boardId} apiKey={apiKey} apiToken={apiToken} />
        )}
      </Box>
    </Box>
  );
}
export default Boards