import { User } from '../entity/User';
import { hash, compare } from 'bcrypt';

const Resolver = {
	Query: {
		test: _ => 'testing'
	},
	Mutation: {
		register: async (_, { email, password, admin=false }) => {
			const userExist = await checkUserExists(email);
			if (userExist) return null;

			const hashedPassword = await hash(password, 10);
			const user = await User.create({
				email,
				password: hashedPassword,
				admin
			}).save();

			return { id: user.id, admin: user.admin };
		},
		login: async (_, { email, password }) => {
			const userExist = await checkUserExists(email);
			if (!userExist) return null;

			const validPassword = await compare(password, userExist.password);
			if (!validPassword) return null;

			return { id: userExist.id, admin: userExist.admin };
		}
	}
};

async function checkUserExists(email: string) {
	const userExist = await User.findOne({ email });
	return userExist;
}

export default Resolver;
