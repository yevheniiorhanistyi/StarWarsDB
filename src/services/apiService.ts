import { IResourceResponse } from '../types/types';

class ApiService {
  getResource = async (url: string): Promise<IResourceResponse> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return res.json();
  };

  getAllCharacters = (endpoint: string) => this.getResource(`https://swapi.dev/api/people/?search=${endpoint}`);

  getCharacter = (id: string) => this.getResource(`https://swapi.dev/api/people/${id}`);
}

export default ApiService;
