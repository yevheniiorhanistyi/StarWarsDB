import { useHttp } from '../hooks/http.hook';
import { IResourceResponse } from '../types/types';

const useApiService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const apiBase = 'https://swapi.dev/api/';

  const getAllCharacters = async (endpoint: string, page: number): Promise<IResourceResponse> => {
    const response: Promise<IResourceResponse> = await request(`${apiBase}people/?search=${endpoint}&page=${page}`);
    return response;
  };

  const getCharacter = async (id: string) => {
    const response = await request(`${apiBase}people/${id}`);
    return response;
  };

  return {
    getAllCharacters,
    getCharacter,
    clearError,
    process,
    setProcess,
  };
};

export default useApiService;
