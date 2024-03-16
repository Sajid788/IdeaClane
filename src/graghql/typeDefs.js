const typeDefs = `
type User {
    id: ID!
    email: String!
    name: String
    password: String
    role: String!
    accessToken: String
}

type Query {
    users: [User]
    user(id: ID!): User
}


type Mutation {
    createUser(email: String!, name: String!, password: String!, role: String!): User
    loginUser(email: String!, password: String!): User
}

`;

module.exports = typeDefs;