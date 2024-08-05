const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolver = {
    Query: {
        users: async () => User.find(),
        user: async (_, { id }) => User.findById(id),
    },
    Mutation: {
        register: async (_, { username, password, role, organizationId }) => {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ username, password: hashedPassword, role, organizationId });
            return user.save();
        },
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        },
    },
};

module.exports = userResolver;
