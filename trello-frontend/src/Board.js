import React, { useState, useEffect } from "react";
import { Box, Heading,Spinner } from "@chakra-ui/react";

const Board = ({ boardId, apiKey, apiToken }) => {
    const [board, setBoard] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const boardResponse = await fetch(
                    `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`
                );
                const boardData = await boardResponse.json();
                setBoard(boardData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBoard();
    }, [boardId, apiKey, apiToken]);

    if (isLoading) {
        return (
            <Box textAlign="center">
                <Spinner size="xl" color="blue.500" />
            </Box>
        );
    }
    return (
        <Box maxW="800px" mx="auto" my="8">
            {isLoading ? (
                <Heading>Loading...</Heading>
            ) : (
                <>
                    <Heading mb="4">Board Name - {board.name}</Heading>
                        <Heading size={"md"}>
                            Board Link  - 
                        <a style={{color:"blue"}} href={board.shortUrl} target="_blank" rel="noreferrer">View on Trello</a>
                        </Heading>
                </>
            )}
        </Box>
    );
};

export default Board;




