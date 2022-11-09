import user from "../model/User";

export const findMail = async (req, res, next) => {
    try {
        const result = await user.findOne({ email: req.body.email });
        if (result) {
            req.user = result
            next();
        } else {
            res.send({
                status: false,
                message: "Email not exist!!!!",
            });
        }
    } catch (error) {
        throw error;
    }
};