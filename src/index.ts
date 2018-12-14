import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import schema from './schema';
import { dbconfig } from './config/ormconfig';

const server = new ApolloServer({ schema });
let retry = 10;
const startServer = async () => {
	while (retry !== 0) {
		try {
			await createConnection(dbconfig);
			console.log('< Connected with database >');
			server.listen(process.env.PORT || '4000').then(({ url }) => {
				console.log(`==============Connected at ${url}==============`);
			});
			break;
		} catch (e) {
			retry--;
			console.log(e);
			console.log(`${retry} retry remaining`);
			await new Promise(res => setTimeout(res, 5000));
		}
	}
};

startServer();
