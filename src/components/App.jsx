import styled from 'styled-components';

const App = () => {
  console.log('Hello world');

  const fetchData = async () => {
    // const response = await fetch(
    //   'https://jsonplaceholder.typicode.com/comments'
    // );

    // const data = await response.json();
    // console.log(data);

    console.log(process.env.MARVEL_KEY);
  };

  return (
    <Wrapper className='flex'>
      <button type='button' onClick={fetchData}>
        Click Me
      </button>

      <h2>This is a paragraph </h2>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding: 5px 5px;
  flex-direction: column;
  h2 {
    letter-spacing: 1px;
    font-size: 1.2em;
    font-weight: 700;
    color: #1a1919;
  }

  button {
    padding: 5px 10px;
    border-radius: 5px;
    margin: 10px 0;
    font-size: 0.9em;
    font-weight: 400;
  }
`;

export default App;
