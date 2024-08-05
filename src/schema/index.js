const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('../resolvers');

const typeDefs = `
type User {
    id: ID!
    username: String!
    role: String!
    organizationId: ID!
}

type Organization {
    id: ID!
    name: String!
}

type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String
    userId: ID!
    organizationId: ID!
}

type Query {
    users: [User]
    user(id: ID!): User
    organizations: [Organization]
    organization(id: ID!): Organization
    tasks: [Task]
    task(id: ID!): Task
}

type Mutation {
    register(username: String!, password: String!, role: String!, organizationId: ID!): User
    login(username: String!, password: String!): AuthPayload
    createOrganization(name: String!): Organization
    updateOrganization(id: ID!, name: String!): Organization
    deleteOrganization(id: ID!): Organization
    createTask(title: String!, description: String, status: String!, dueDate: String, userId: ID!, organizationId: ID!): Task
    updateTask(id: ID!, title: String!, description: String, status: String!, dueDate: String): Task
    deleteTask(id: ID!): Task
}

type AuthPayload {
    token: String
}

schema {
    query: Query
    mutation: Mutation
}
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
