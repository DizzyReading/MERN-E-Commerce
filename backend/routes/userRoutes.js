import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../frontend/src/data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		// await User.deleteMany({});
		const createdUsers = await User.insertMany(data.users);
		res.send({ createdUsers });
	})
);

// signin router

userRouter.post(
	'/signin',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user)
				});
				return;
			}
		}
		res.status(401).send({ message: 'Invalid email or password' });
	})
);

export default userRouter;

userRouter.post(
	'/register',
	expressAsyncHandler(async (req, res) => {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compare(req.body.email, user.email)) {
				res.status(401).send({ message: 'Email already in use.' });
			}
		} else {
			user = new User({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8)
			});

			const createdNewUser = await user.save();

			res.send({
				_id: createdNewUser._id,
				name: createdNewUser.name,
				email: createdNewUser.email,
				isAdmin: createdNewUser.isAdmin,
				token: generateToken(createdNewUser)
			});
		}
	})
);

// 	const user = new User({
// 		name: req.body.name,
// 		email: req.body.email,
// 		password: bcrypt.hashSync(req.body.password, 8)
// 	});

// 	const createdNewUser = await user.save();

// 	res.send({
// 		_id: createdNewUser._id,
// 		name: createdNewUser.name,
// 		email: createdNewUser.email,
// 		isAdmin: createdNewUser.isAdmin,
// 		token: generateToken(createdNewUser)
// 	});
// })
