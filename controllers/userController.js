module.exports = {
  signUp: async (req, res, next) => {
    try {
      const user = req.username;
      //Respond with user name
      res.json({
        success: true,
        user: user
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json("server error!");
    }
  }
};
