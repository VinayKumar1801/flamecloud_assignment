import axios from 'axios';

const API_KEY = "731c07ee2838d6697583186746311876";
const TOKEN = "ATTAbabdcd1c0fc03185bf0f4e8876a64bdc6b1580ca7c0f8fea20f6196f7c06d7d6497D7F89";
const BASE_URL = 'https://api.trello.com/1';

// Create a new board
export const createBoard = async (name) => {
    const response = await axios.post(
        `${BASE_URL}/boards`,
        {
            name,
            defaultLabels: false,
            defaultLists: false,
            keepFromSource: 'none',
            prefs_permissionLevel: 'private',
        },
        { params: { key: API_KEY, token: TOKEN } }
    );
    return response.data;
};
