var expect = require('chai').expect;
var assert = require('assert');
var filters = require("../lib/filters.js");
var _ = require('lodash');

describe('Cats', function() {
  describe('result size', function() {
    it('should have 2 elements (Male and Female) when the input has 2 types of cat owners', function() {
      var owners= [{"name":"Cat Owner1", "gender":"Male", "pets":[{"name":"CanIHaz", "type":"Cat"},{"name":"CheezBurger", "type":"Cat"}]},
                   {"name":"Cat Owner1", "gender":"Female", "pets":[{"name":"Yeti", "type":"Cat"},{"name":"Mambo", "type":"Dog"}]}];
      expect(_.keys(filters.filter(owners))).to.have.lengthOf(2);
    });
    it('should have 1 elements (either Male and Female) when the input has 1 type of cat owners', function() {
      var owners= [{"name":"Cat Owner1", "gender":"Male", "pets":[{"name":"CanIHaz", "type":"Cat"},{"name":"CheezBurger", "type":"Cat"}]}];
      expect(_.keys(filters.filter(owners))).to.have.lengthOf(1);
    });
    it('should have no when the input is blank', function() {
      var owners= [];
      expect(_.keys(filters.filter(owners))).to.have.lengthOf(0);
    });    
  });

  describe('result elements', function() {
    it('should contain CanIHaz and CheezBurger', function() {
      var owners= [{"name":"Cat Owner1", "gender":"Male", "pets":[{"name":"CanIHaz", "type":"Cat"},{"name":"Mambo", "type":"Fish"}]},
                   {"name":"Cat Owner1", "gender":"Female", "pets":[{"name":"CheezBurger", "type":"Cat"},{"name":"Mambo", "type":"Dog"}]}];
      var expectedOutput = {"Male":["CanIHaz"],"Female":["CheezBurger"]};
      assert.deepEqual(expectedOutput, filters.filter(owners));
    });

    it('should not containMambo ', function() {
      var owners= [{"name":"Cat Owner1", "gender":"Male", "pets":[{"name":"CanIHaz", "type":"Cat"},{"name":"Mambo", "type":"Fish"}]},
                   {"name":"Cat Owner1", "gender":"Female", "pets":[{"name":"CheezBurger", "type":"Cat"},{"name":"Mambo", "type":"Dog"}]}];
      var expectedOutput = {"Male":["Mambo"],"Female":["Mambo"]};
      assert.notDeepEqual(expectedOutput, filters.filter(owners));
    });    
  });

});