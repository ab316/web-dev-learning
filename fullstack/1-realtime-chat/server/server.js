import {GraphQLServer} from 'graphql-yoga';

const messages = [{id: 0, user: 'baig', content: 'Hello!'}];

const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
`;

const resolvers = {
  Query: {
    messages: () => messages,
  },

  Mutation: {
    postMessage: (_, {user, content}) => {
      const id = messages.length;
      messages.push({id, user, content});
      return id;
    },
  },
};

const server = new GraphQLServer({typeDefs, resolvers});
server.start((options) => {
  console.log(
    `GraphQL Server started on port: http://localhost:${options.port}/`,
  );
});
