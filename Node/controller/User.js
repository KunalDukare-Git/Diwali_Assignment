import user from "../model/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SendEmail } from "../middleware/SendEmail";

/*-----------------User Signup----------------------*/
export const userSignup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      add_line1,
      add_line2,
      city,
      state,
      mobile,
      email,
    } = req.body;

    const addUser = new user({
      first_name,
      last_name,
      address: {
        add_line1,
        add_line2,
        city,
        state,
      },
      mobile,
      image: req.file.filename,
      email,
      password: bcrypt.hashSync(req.body.password, 8),

    });

    const result = await addUser.save();

    result.image = `http://localhost:8080/uploads/${result.image}`;

    if (result) {
      let payload = {};
      payload._id = result._id;

      jwt.sign(
        payload,
        "SECRET_KEY",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          res.send({
            token: token,
            status: true,
            statusCode: 200,
            message: "Registerd Successfully",
            result: result,
          });
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

/*-----------------User Login-------------------*/
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });

    if (!result) {
      res.send({
        status: false,
        message: "Email is Incorrect!!!",
      });
    } else {
      const isValid = bcrypt.compareSync(password, result.password);
      result.image = `http://localhost:8080/uploads/${result.image}`;

      if (isValid) {
        let payload = {};
        payload._id = result._id;

        jwt.sign(
          payload,
          "SECRET_KEY",
          {
            expiresIn: "24h",
          },
          (err, token) => {
            res.send({
              token: token,
              status: true,
              statusCode: 200,
              message: " Login Success",
              result: result,
            });
          }
        );
      } else {
        res.send({ status: false, message: "Incorrect Password " });
      }
    }
  } catch (error) {
    throw error;
  }
};

/*-----------------User Update------------------*/
export const updateUser = async (req, res) => {
  try {
    const _id = req.verifiedToken._id; //From middleware
    const { first_name, last_name, add_line1, add_line2, city, state, mobile } =
      req.body;
    let data = {
      first_name,
      last_name,
      mobile,
      address: { add_line1, add_line2, city, state },
    };

    const result = await user.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { $set: data },
      { new: true }
    );

    result.image = `http://localhost:8080/uploads/${result.image}`;
    if (!result) {
      res.send({
        status: false,
        statusCode: 400,
        message: "Updation Failed!! Something went wrong",
        result: result,
      });
    } else {
      res.send({
        status: true,
        statusCode: 200,
        message: "Successfully Updated",
        result: result,
      });
    }
  } catch (e) {
    throw e;
  }
};


/*--------------Forget password-------------*/
export const forgetPassword = async (req, res) => {
  try {
    if (req.user) {
      let payload = {};
      payload._id = req.user._id;

      jwt.sign(
        payload,
        "SECRET_KEY",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          res.send({
            status: true,
            statusCode: 200,
            message: " Reset password link has been sent to your mail.",
          });
          SendEmail(
            "selfempire07@gmail.com",
            req.user.email,
            'Reset password link',
            `Reset your password by <a href="${process.env.CLIENT_URL}/reset-password/${token}"> clicking here </a>`
          )
        }
      );
    }

  } catch (err) {
    throw err;
  }

}
