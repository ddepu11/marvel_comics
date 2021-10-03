import styled from 'styled-components';

const App = () => {
  console.log('Hello world');

  return (
    <Wrapper className='flex'>
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
