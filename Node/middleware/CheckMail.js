import user from "../model/User";

export const CheckMail = async (req, res, next) => {
  try {
    const result = await user.findOne({ email: req.body.email });

    if (!result) {
      next();
    } else {
      res.send({
        status: false,
        message: "Email Already Registered!!!!",
      });
    }
  } catch (error) {
    throw error;
  }
};
