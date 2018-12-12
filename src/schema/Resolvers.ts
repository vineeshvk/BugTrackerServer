import { compare, hash } from 'bcrypt';
import { IResolvers } from 'graphql-tools';
import { Bug } from '../entity/Bug';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

const resolvers: IResolvers = {
	Query: {
		test,
		viewBugs,
		allUsers
	},
	Mutation: {
		register,
		login,
		addBug,
		changeStatus
	}
};

//Query
function test() {
	return 'testing';
}

/* ------------VIEW BUGS--------------- */
async function viewBugs(_, { userId }) {
	const userExist = await checkUserExists({ id: userId });
	if (!userExist) return null;

	const bugRepo = getRepository(Bug);
	const bugs = await bugRepo.find({ relations: ['assignedTo'] });

	return bugs;
}

/* ---------------ALL USERS----------------- */
async function allUsers(_, { userId }) {
	const userExist = await checkUserExists({ id: userId });
	if (!userExist) return null;

	const users = await User.find();

	return users;
}

//Mutation

/* -------------REGISTER--------------- */
async function register(_, { email, password, admin = false }) {
	const userExist = await checkUserExists({ email });
	if (userExist) return null;
	return await createUser(email, password, admin);
}

const createUser = async (email: string, password: string, admin: boolean) => {
	const hashedPassword = await hash(password, 10);
	const user = await User.create({
		email,
		password: hashedPassword,
		admin
	}).save();
	return { id: user.id, admin: user.admin };
};

/*--------- LOGIN ------------*/
async function login(_, { email, password }) {
	const userExist = await checkUserExists({ email });
	if (!userExist) return null;

	const validPassword = await compare(password, userExist.password);
	if (!validPassword) return null;

	return { id: userExist.id, admin: userExist.admin };
}

const checkUserExists = async (value: { id?: string; email?: string }) => {
	const userExist = await User.findOne(value);
	return userExist;
};

/* -----------ADD BUG------------- */
async function addBug(_, { adminId, title, description, assignEmail }) {
	const { admin } = await User.findOne({ id: adminId });
	if (!admin) return false;

	const user = await User.findOne({ email: assignEmail });
	if (!user) return false;

	return await createBug(title, description, user);
}

const createBug = async (
	title: string,
	description: string = '',
	user: User
) => {
	const newBug = await Bug.create({ title, description });
	newBug.assignedTo = user;
	await newBug.save();
	return true;
};

/* -----------CHANGE STATUS------------- */
async function changeStatus(_, { userId, bugId, status }) {
	if (status !== 'closed' && status !== 'unresolved' && status !== 'resolved')
		return false;

	const user = await checkUserExists({ id: userId });
	const bugRepo = getRepository(Bug);
	const bugs = await bugRepo.find({ relations: ['assignedTo'] });
	const bug = bugs.filter(bug => bug.id === bugId)[0];

	if (user.admin === true) {
		await bug.remove();
		// await bug.save();
		return true;
	}

	if (bug.assignedTo.id === user.id && status !== 'closed') {
		bug.status = status;
		await bug.save();
		return true;
	}

	return false;
}

export default resolvers;
