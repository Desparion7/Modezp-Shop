import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			addressName: user.addressName,
			surname: user.surname,
			street: user.street,
			postalCode: user.postalCode,
			city: user.city,
			phone: user.phone,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			addressName: user.addressName,
			surname: user.surname,
			street: user.street,
			postalCode: user.postalCode,
			city: user.city,
			phone: user.phone,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.addressName = req.body.addressName || user.addressNam;
		user.surname = req.body.surname || user.surname;
		user.street = req.body.street || user.street;
		user.postalCode = req.body.postalCode || user.postalCode;
		user.city = req.body.city || user.city;
		user.phone = req.body.phone || user.phone;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updateUser = await user.save();
		res.json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
			addressName: updateUser.addressName,
			surname: updateUser.surname,
			street: updateUser.street,
			postalCode: updateUser.postalCode,
			city: updateUser.city,
			phone: updateUser.phone,
			token: generateToken(updateUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
