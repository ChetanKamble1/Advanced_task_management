const Organization = require('../models/Organization');

const organizationResolver = {
    Query: {
        organizations: async () => Organization.find(),
        organization: async (_, { id }) => Organization.findById(id),
    },
    Mutation: {
        createOrganization: async (_, { name }) => {
            const organization = new Organization({ name });
            return organization.save();
        },
        updateOrganization: async (_, { id, name }) => {
            return Organization.findByIdAndUpdate(id, { name }, { new: true });
        },
        deleteOrganization: async (_, { id }) => {
            return Organization.findByIdAndDelete(id);
        },
    },
};

module.exports = organizationResolver;
