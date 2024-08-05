const { mergeResolvers } = require('@graphql-tools/merge');
const userResolver = require('./userResolver');
const organizationResolver = require('./organizationResolver');
const taskResolver = require('./taskResolver');

const resolvers = mergeResolvers([userResolver, organizationResolver, taskResolver]);

module.exports = resolvers;
