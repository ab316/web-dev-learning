// PubSub should not be using for production
import {GraphQLServer, PubSub} from 'graphql-yoga';

const messages = [{id: 0, user: 'baig', content: 'Hello!'}];
const subscribers = [];
const onMessageUpdates = (fn) => subscribers.push(fn);

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

  type Subscription {
    messages: [Message!]
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
      subscribers.forEach((fn) => fn());
      return id;
    },
  },

  Subscription: {
    messages: {
      subscribe: () => {
        const channel = Math.random().toString(36).slice(2, 15);
        const fn = () => pubsub.publish(channel, {messages});
        onMessageUpdates(fn);
        // Publish the existing message on subscription
        setTimeout(fn, 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const pubsub = new PubSub();
const server = new GraphQLServer({typeDefs, resolvers});
server.start((options) => {
  console.log(
    `GraphQL Server started on port: http://localhost:${options.port}/`,
  );
});
