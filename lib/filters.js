var _ = require("lodash");

var filter =  function(owners) {
	return _.chain(owners)
	//pick only the required fields
	.map(function(o){
		return _.pick(o, ["gender","pets"])
	})
	//filter owners who have cats
	.filter({"pets":[{"type": "Cat"}]})
	//filter cats from pets and pick only the names
	.each(function(o){
		o.pets = _.chain(o.pets)
		.filter({"type": "Cat"})
		.map("name")
		.value();
	})
	//move all names into gender specific fields
	.reduce(function(result, value, key){
		if (!result[value.gender])
			result[value.gender] = [];
		result[value.gender] = result[value.gender].concat(value.pets);
		return result;
	}, {})
	//sort the fields
	.forOwn(function(value, key, object){
		if (_.isArray(value)){
			object[key] = _.sortBy(value);
		}
	})	
	.value();
}

module.exports.filter = filter;