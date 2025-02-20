import User from "../models/user-model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.json({ message: "User Not found" });
    }
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const deleted = await User.deleteMany({});
    res.status(200).send("All users are deleted");
  } catch (err) {
    next(err);
  }
};


export const home = (req,res,next,) => {
  res.status(200).json({ message: "Weclome to Home page" });
};


export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      res
      .clearCookie("refresh_token")
      .status(200)
      .json({ message: "Cookies Removed logout" });
  } catch (err) {
    next(err);
  }
};

