import { useEffect, useRef, useState } from 'react';

const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  const apiKey = process.env.MARVEL_KEY;

  const fetchData = async (endPoint) => {
    setLoading(true);

    try {
      const response = await fetch(`${endPoint}?apikey=${apiKey}`);

      const { data: newData } = await response.json();

      if (mounted.current) {
        setData(newData.results);
        setLoading(false);
      }
    } catch (err) {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    data,
    fetchData,
  };
};

export default useFetchData;
