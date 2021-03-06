const mongoose = require('mongoose');

const modelName = require('./models.names').project;

const {
	Schema
} = mongoose;

const projectSchema = new Schema({
	name: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "project name can't be blank"]
	},
	company: {
		index: true,
		type: Schema.Types.ObjectId,
		ref: 'Company',
		required: [true, "company can't be empty"]
	},
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}]
}, {
	timestamps: true,
	autoIndex: true
});

projectSchema.methods.assignUser = async function (userId) {
	const project = this;
	if (project.users.includes(userId)) {
		throw Error('user already exists in this project');
	} else {
		project.users = project.users.concat(userId);
		await project.save();
	}
};

projectSchema.methods.removeUser = async function (userId) {
	const project = this;
	project.users = project.users.filter(user => user.str() !== userId);
	await project.save();
};

const Project = mongoose.model(modelName, projectSchema);

module.exports = Project;
