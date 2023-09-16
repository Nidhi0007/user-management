const checkAdmin = async (user) => {
  if (!user.isAdmin) {
    throw new Error("Only Admin have this access");
  } else {
   return;
  }
};
module.exports = checkAdmin;
