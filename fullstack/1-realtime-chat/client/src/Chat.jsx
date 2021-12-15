import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client';
import {Container, Row, Col, FormInput, Button} from 'shards-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      user
      content
    }
  }
`;

const POST_MESSAGE = gql`
  mutation postMessage($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({myUser}) => {
  const {loading, error, data} = useQuery(GET_MESSAGES, {pollInterval: 500});

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {data.messages.map(({id, user, content}) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: myUser === user ? 'flex-end' : 'flex-start',
            paddingBottom: '1em',
          }}>
          {user !== myUser && (
            <div
              style={{
                width: 50,
                height: 50,
                marginRight: '0.5em',
                paddingTop: 5,
                border: '2px solid #e5e6ea',
                borderRadius: 25,
                textAlign: 'center',
                fontSize: '18pt',
              }}>
              {user.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: myUser === user ? '#58bf56' : '#e5e6ea',
              color: myUser === user ? 'white' : 'black',
              padding: '1em',
              borderRadius: '1em',
              maxWidth: '60%',
            }}>
            {content}
          </div>
        </div>
      ))}
    </>
  );
};

const Chat = () => {
  const [postMessage, {loading, error, data}] = useMutation(POST_MESSAGE);
  const [state, setState] = React.useState({
    user: 'baig',
    content: '',
  });

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
      setState({...state, content: ''});
    }
  };

  return (
    <Container>
      <Messages myUser={state.user} />
      <Row>
        <Col xs={2} style={{padding: 0}}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(e) => setState({...state, user: e.target.value})}
          />
        </Col>

        <Col xs={8}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={(e) => setState({...state, content: e.target.value})}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>

        <Col xs={2} style={{padding: 0}}>
          <Button onClick={() => onSend()}>Send</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
