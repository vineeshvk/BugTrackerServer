import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import schema from './schema';

const startServer = async () => {
	const server = new ApolloServer({ schema });
	await createConnection();
	server.listen().then(({ url }) => console.log(`connected at ${url}`));
};

startServer();
