
const { RegisterUser, LoginUser} = require("../controller/userController");
// const authorization = require("../middleware/authorization.middleware");

const resolvers = {
    Query: {
        users: async () => {return await getAllUser()},
        user: async (_, {id}) => {return await getUserProfile(id)},
    },
    Mutation: {
        createUser: async (_, {email,name, password,role}) => {return await RegisterUser({email,name, password,role})},
        loginUser: async (_, {email, password})=> {return await LoginUser({email,password})},
    },
};

module.exports = resolvers;