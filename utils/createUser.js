const createUser = (user) => {
  return {
    _id: user._id,
    email: user.email,
    profilePic: user.profilePic,
    isAdmin: user.isAdmin,
  };
};

module.exports = createUser;
