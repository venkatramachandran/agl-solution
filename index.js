var _ = require("lodash");
var request = require("request");
var filters = require("./lib/filters.js");

function fetchData(entryPoint) {
 request(entryPoint, function(error, response, body){
 	if (error != null) {
 		console.log("error occured while trying to fetch data!");
 		console.log(err);
 	} else {
 		var owners = JSON.parse(body);
		var filteredPets = filters.filter(owners);
		var keys = _.keys(filteredPets);
		for (var i = 0; i < keys.length; i++) {
			console.log(keys[i]);
			for (var j = 0; j < filteredPets[keys[i]].length; j++) {
				console.log("\t "+filteredPets[keys[i]][j]);
			}
		}
 	}
 });
}

fetchData("http://agl-developer-test.azurewebsites.net/people.json");
