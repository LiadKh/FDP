/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const modelName = require('./models.names').user;

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				lowercase: true,
				trim: true,
				minlength: 3,
				required: [true, "first name can't be blank"]
			},
			last: {
				type: String,
				lowercase: true,
				trim: true,
				minlength: 3,
				required: [true, "last name can't be blank"]
			}
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, "email can't be blank"],
			index: true,
			trim: true,
			validate: value => {
				if (!validator.isEmail(value)) {
					throw new Error({
						massage: `Invalid Email address ${value}`
					});
				}
			}
		},
		password: {
			type: String,
			required: [true, "password can't be blank"],
			minlength: 3
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		isManager: {
			type: Boolean,
			default: false
		},
		company: {
			type: Schema.Types.ObjectId,
			ref: 'Company'
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
);

userSchema.pre('save', async function(next) {
	// Hash the password before saving the user model
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.generateAuthToken = async function() {
	// Generate an auth token for the user
	const user = this;
	const token = jwt.sign(
		{
			// eslint-disable-next-line no-underscore-dangle
			_id: user._id
		},
		process.env.JWT_KEY
	);
	user.tokens = user.tokens.concat({
		token
	});
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	// Search for a user by email and password.
	const user = await this.findOne({
		email
	});
	if (!user) {
		throw new Error({
			massage: 'Invalid login credentials'
		});
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw new Error({
			massage: 'Invalid login credentials'
		});
	}
	return user;
};

userSchema.statics.deleteUser = async (companyId, userId) => {
	this.deleteOne(
		{
			company: companyId,
			_id: userId
		},
		err => {
			if (err) {
				throw new Error({
					massage: err
				});
			}
		}
	);
};

const User = mongoose.model(modelName, userSchema);

module.exports = User;
