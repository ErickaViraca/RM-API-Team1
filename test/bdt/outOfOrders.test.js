var expect = require('chai').expect;
var randomstring = require("randomstring");
var moment = require("moment");
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var outOfOrder = endPointManager.getOutOfOrder();
var outOfOrderValues = resourceManager.getOutOfOrdersValues();
var constant = resourceManager.getConstantVariables();
var config = requireManager.getRequireConfig();
var status = resourceManager.getStatus();
var room = endPointManager.getRoom();

/*
Feature: Out-Of-Order

Scenario 1: Verify the correct assignment of an out-of-order created in a determined Room.
	Given I get an existent room.
	When I create an out-of-order on the room previously specify.
	Then ensure that the room has assigned the out-of-order.
*/

describe('Out-of-orders Bdt Test', function () {
	this.timeout(config.timeout);
	var nameOutOfOrders = outOfOrderValues.title + randomstring.generate({ length: 6, charset: 'alphabetic'});

	context('Scenario 1: Verify the correct assignment of an out-of-order created in a determined Room. ',function(){
		var Room = {};
		var OutOfOrder = {};

		it('Given I get an existent \'Room\'',function(done){
			room.getDefaultRoom(function(oneRoom){
				Room =  oneRoom;
				done();
			});
		});

		it('When I create an \'out-of-order\' on the room previously specify',function(done){
			var outOfOrderJson = {
				roomId : Room._id,
				from : moment().add(constant.ADDFROM, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
				to : moment().add(constant.ADDTO, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
				title : nameOutOfOrders,
				sendEmail : outOfOrderValues.sendEmail	
			};
			outOfOrder.create(outOfOrderJson, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.status).to.equal(status.OK);
	            done();
			});
		});

		it('Then ensure that the room has assigned the \'out-of-order\'',function(done){
			outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.body.roomId).to.equal(OutOfOrder.roomId);
	            done();
			});
		});

		it('And I delete the \'out-of-order\'  created',function(done){
			outOfOrder.delete(OutOfOrder._id, function(err, res) {
				expect(res.status).to.equal(status.OK);
				outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
					OutOfOrder = res.body;
		     	    expect(res.status).to.equal(status.NOT_FOUND);
		            done();
				});
			});
		});
 	});

/*
Scenario 2: Verify an out-of-order deleted not exist more.
	Given I create an out-of-order.
	When I delete the out-of-order.
	Then I search by out-of-order Id, with an expect status code 404.
*/

 	context('Scenario 2: Verify an out-of-order deleted not exist more',function(){
		var OutOfOrder = {};

		it('Given I create an \'out-of-order\'',function(done){
			room.getDefaultRoom(function(oneRoom){
				var outOfOrderJson = {
					roomId : oneRoom._id,
					from : moment().add(constant.ADDFROM, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
					to : moment().add(constant.ADDTO, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
					title : nameOutOfOrders,
					sendEmail : outOfOrderValues.sendEmail
				};
				outOfOrder.create(outOfOrderJson, function(err,res){
					OutOfOrder = res.body;
		     	    expect(res.status).to.equal(status.OK);
		            done();
				});
			});
			
		});

		it('When I delete the \'out-of-order\'',function(done){
			outOfOrder.delete(OutOfOrder._id, function(err, res) {
				expect(res.status).to.equal(status.OK);
	            done();
			});
		});

		it('Then I search by \'out-of-order\' Id, with an expect status code 404',function(done){
			outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.status).to.equal(status.NOT_FOUND);
	            done();
			});
		});
 	});

});
