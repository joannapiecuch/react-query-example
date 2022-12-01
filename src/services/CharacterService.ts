import axios from 'axios';
import { Character, CharactersDataType } from '../types/character';

const baseUrl = process.env.REACT_APP_CLIENT_URL || '';

export const fetchCharacters = async (
  page = 1
): Promise<CharactersDataType> => {
  try {
    const response = await axios.get(`${baseUrl}/character/?page=${page}`);

    return response.data;
  } catch (error) {
    return error as any;
  }
};

export const fetchCharactersInfinity = async (
  page = 1
): Promise<CharactersDataType> => {
  try {
    const response = await axios.get(`${baseUrl}/character/?page=${page}`);

    return response.data;
  } catch (error) {
    return error as any;
  }
};

export const fetchCharacter = async (id?: string): Promise<Character> => {
  try {
    const response = await axios.get(`${baseUrl}/character/${id}`);

    return response.data;
  } catch (error) {
    return error as any;
  }
};
