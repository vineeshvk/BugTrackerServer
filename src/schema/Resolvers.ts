const Resolver = {
	Query: {
		test: _ => 'testing'
	},
	Mutation: {
		register: (_, { email, password }) => {
			return { id: '1234', admin: true };
		},
		login: (_, { email, password }) => {
			return { id: '1234', admin: true };
		}
	}
};

export default Resolver;
