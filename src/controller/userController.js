const UserModel = require("../model/UserModel");

const generateToken = async (userId) => {
    try {
      const user = await UserModel.findById(userId);
      const accessToken = user.generateAccessToken();
  
      return accessToken;
    } catch (error) {
      throw new Error("Unable to create Accesstoken at this moment");
    }
  };


  const RegisterUser = async (userData) => {
    const { email, name, password, role } = userData;
  
    try {
      if (!name || !email || !password || !role) {
        throw new Error(
          "please fill all the feild"
        );
      }
      const user = await UserModel.findOne({ email: email });
      if (user) {
        throw new Error("User Already Exist");
      }
      const newUser = await UserModel.create({ email, name, password, role });
  
      return newUser;
    } catch (error) {
      throw error;
    }
  };


  const LoginUser = async (LoginData) => {
    const { email, password } = LoginData;
  
    try {
      if (!email || !password) {
        throw new Error(
          "please fill all the feild"
        );
      }
  
      const existedUser = await UserModel.findOne({ email: email });
      if (!existedUser) {
        throw new Error("please signup first");
      }
  
      const isPasswordCorrect = await existedUser.isPasswordCorrect(
        email,
        password
      );
      if (!isPasswordCorrect) {
        throw new Error("Incorrect Password");
      }
  
      const accessToken = await generateToken(existedUser._id);
      const loggedInUser = await UserModel.findById(existedUser._id).select(
        "-password"
      );
      console.log(accessToken);
      const options = {
        httpOnly: true,
        secure: true,
      };
      loggedInUser.accessToken = accessToken;
      return loggedInUser;
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    RegisterUser,
    LoginUser }
  