import { ConnectionOptions } from 'typeorm';
import { User } from '../entity/User';
import { Bug } from '../entity/Bug';

const docker = {
	host: 'postgres',
	port: 5432,
	username: 'postgres',
	password: '12345',
	database: 'postgresdb'
};

const deploy = {
	url: process.env.DATABASE_URL,
	extra: { ssl: true }
};

const config = process.env.DATABASE_URL ? deploy : docker;

export const dbconfig: ConnectionOptions = {
	...config,
	type: 'postgres',
	synchronize: true,
	logging: false,
	entities: [User, Bug],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: '../entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber'
	}
};
