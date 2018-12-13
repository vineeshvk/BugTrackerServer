// const production = {
// 	type: 'postgres',
// 	host: 'postgres',
// 	port: 5432,
// 	username: 'postgres',
// 	password: '12345',
// 	database: 'postgresdb',
// 	synchronize: true,
// 	logging: false,
// 	entities: ['src/entity/**/*.ts'],
// 	migrations: ['src/migration/**/*.ts'],
// 	subscribers: ['src/subscriber/**/*.ts'],
// 	cli: {
// 		entitiesDir: 'src/entity',
// 		migrationsDir: 'src/migration',
// 		subscribersDir: 'src/subscriber'
// 	}
// };

console.log(process.env.DATABASE_URL);

const production = {
	url: process.env.DATABASE_URL,
	type: 'postgres',
	synchronize: true,
	logging: false,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber'
	},
	extra: {
		ssl: true
	}
};
module.exports = production;
