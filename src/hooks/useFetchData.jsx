import { useState } from 'react';

const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const apiKey = process.env.MARVEL_KEY;

  const fetchData = async (endPoint) => {
    setLoading(true);

    const response = await fetch(`${endPoint}?apikey=${apiKey}`);

    const { data: newData } = await response.json();

    setData(newData.results);

    setLoading(false);
  };
  
  return {
    loading,
    data,
    fetchData,
  };
};

export default useFetchData;
