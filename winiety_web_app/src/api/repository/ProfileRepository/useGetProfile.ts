import { Profile, Error } from 'api/types';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAxios, apiEndpoints } from 'api';

const useGetProfile = (
  onError?: (error: AxiosError<Error>) => void
): [Profile | null | undefined, () => Promise<Profile | null | undefined>] => {
  const axios = useAxios();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get<Profile>(
        `${apiEndpoints.profile}/profile`
      );
      setProfile(data);
      return data;
    } catch (error) {
      if (onError) onError(error);
      setProfile(null);
    }
    return null;
  }, [axios, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return [profile, fetchData];
};

export default useGetProfile;
