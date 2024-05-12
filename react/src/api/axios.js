import axios from 'axios';

const PokedexInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export default PokedexInstance;
