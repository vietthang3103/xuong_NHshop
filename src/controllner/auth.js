import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/user";


const SignupSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPasswork: Joi.string().required().valid(Joi.ref('password'))
})

export const Signup = async (req, res) => {
    const { email, password, name } = req.body;
    const { error } = SignupSchema.validate(req.body, { abortEarly: false });
    console.log(error);
    if (error) {
        const messages = error.details.map((item) => item.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });

    return res.status(StatusCodes.CREATED).json({
        user,
    });
};
export const Signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: ["Email không tồn tại"],
        });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Mật khẩu không chính xác"],
        });
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "7d",
    });
    return res.status(StatusCodes.OK).json({
        user,
        token,
    });
};
export const logout = async (req, res) => {};