import PokedexInstance from './axios';

const findPokemons = async (targetOffset) => {
  try {
    const queryParams = new URLSearchParams({
      limit: '20',
      offset: `${targetOffset}`,
    });
    const res = await PokedexInstance.get(`/pokemon?${queryParams.toString()}`);

    const detailRes = await Promise.all(
      res.data.results.map((result) => {
        return PokedexInstance.get(result.url);
      }),
    );

    return res.data.results.map((data, i) => {
      data = detailRes[i].data;
      return data;
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const searchPokemon = async (name) => {
  try {
    const res = await PokedexInstance.get(`/pokemon/${name}`);
    return [res.data];
  } catch (e) {
    return [];
  }
};

const findPokemonDetail = async (id) => {
  try {
    const res = await PokedexInstance.get(`/pokemon/${id}`);
    console.log(res);
    const speciesRes = await PokedexInstance.get(res.data.species.url);
    const typeRes = await PokedexInstance.get(res.data.types[0].type.url);
    res.data.species = speciesRes.data;
    res.data.type = typeRes.data;
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export { findPokemons, searchPokemon, findPokemonDetail };
