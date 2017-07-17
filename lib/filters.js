var _ = require("lodash");

var filter =  function(owners) {
	return _.chain(owners)
	.map(function(o){
		return _.pick(o, ["gender","pets"])
	})
	.filter({"pets":[{"type": "Cat"}]})
	.each(function(o){
		o.pets = _.chain(o.pets)
		.filter({"type": "Cat"})
		.map("name")
		.value();
	})
	.reduce(function(result, value, key){
		if (!result[value.gender])
			result[value.gender] = [];
		result[value.gender] = result[value.gender].concat(value.pets);
		return result;
	}, {})
	.forOwn(function(value, key, object){
		if (_.isArray(value)){
			object[key] = _.sortBy(value);
		}
	})	
	.value();
}

module.exports.filter = filter;