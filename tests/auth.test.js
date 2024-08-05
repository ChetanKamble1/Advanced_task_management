const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Auth API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    register(username: "testuser", password: "password", role: "User", organizationId: "testorg") {
                        id
                        username
                    }
                }
                `,
            });

        expect(res.body.data.register.username).toBe('testuser');
    });

    it('should login a user', async () => {
        const user = new User({
            username: 'testuser',
            password: 'password',
            role: 'User',
            organizationId: 'testorg',
        });
        await user.save();

        const res = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    login(username: "testuser", password: "password") {
                        token
                    }
                }
                `,
            });

        expect(res.body.data.login.token).toBeDefined();
    });
});
