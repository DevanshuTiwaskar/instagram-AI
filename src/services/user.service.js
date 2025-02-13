import userModel from "../models/user.js";

export const createUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All field are required [username,password,email]");
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    throw new Error("User Already Existed");
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  delete user._doc.password; // This line is used to delete the password from the user object, so it is not sent to the frontend.

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new Error("Invalid Credentials");
  }

  delete user._doc.password;

  return user;
};
