import styled from 'styled-components';
import useFetchData from '../../hooks/useFetchData';

const Home = () => {
  console.log('Home');

  const { data, loading, fetchData } = useFetchData();

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <h2>Home</h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
`;

export default Home;
