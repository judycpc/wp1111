import { useEffect } from 'react';
import styled from 'styled-components';
import { useChat } from './hooks/useChat';
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  // const { status, me, signedIn, displayStatus } = useChat();
  const { status, signedIn, displayStatus } = useChat();

  useEffect(() => {displayStatus(status)}, [status, displayStatus]);

  return (
    <Wrapper>
      {/* {signedIn ? <ChatRoom me={me} /> : <SignIn me={me} />} */}
      {signedIn ? <ChatRoom /> : <SignIn />}
    </Wrapper>
  );
};

export default App;
