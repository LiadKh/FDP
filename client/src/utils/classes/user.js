var User = function (name, email, isAdmin, isManager, _id) {
	this.name = {
		first: name.first,
		last: name.last
	};
	this.email = email;
	this.isAdmin = isAdmin;
	this.isManager = isManager;
	this._id = _id;
};

User.fromJson = function (json) {
	var obj = JSON.parse(JSON.stringify(json));
	return new User(obj.name, obj.email, obj.isAdmin, obj.isManager, obj._id);
};

export default User;
