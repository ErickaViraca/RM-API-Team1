var expect = require('chai').expect;
var randomstring = require("randomstring");
var moment = require("moment");
var randomstring = require("randomstring");
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var config = requireManager.getRequireConfig();
var service = endPointManager.getService();
var room = endPointManager.getRoom();
var constant = resourceManager.getConstantVariables();
var outOfOrderValues = resourceManager.getOutOfOrdersValues();
var outOfOrder = endPointManager.getOutOfOrder();
var location = endPointManager.getLocation();
var resource = endPointManager.getResource();
var resources = resourceManager.getResources();
var status = resourceManager.getStatus();

/*
Feature: Workflow Test

Scenario : Verify a basic workflow, having a room and a service already created
		   and related, would create a new out-of-order for the service/room identified. 
		   Follow a location and a resource are created, and assigned to the service/room.
	Given I get a service.
		And I get a room.
	When I create an out-of order in the room
		And I create a location.
		And I create a resource.
	Then I assigned the location and resource to the room.
*/

describe('Workflow Test', function () {
	context('Verify a basic workflow, having a room and a service already created.....',function(){
	this.timeout(config.timeout);
	var nameOutOfOrders = outOfOrderValues.title + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var name= resources.resourname + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var Room = {};
	var resourceJson = {};
	var locationJson = {};
	var outOfOrdersJson = {};
	var Service = {};

	after(function(done){
		outOfOrder.delete(outOfOrdersJson._id, function (err, res){
	        expect(res.status).to.equal(status.OK);
	        location.delete(locationJson._id, function (err, res){
		        expect(res.status).to.equal(status.OK);
		        resource.delete(resourceJson._id, function (err, res){
			        expect(res.status).to.equal(status.OK);
			        done();
			    });
	   		});
        });
	});

	it('Given I get a \'Service\'',function(done){
		service.getDefaultService(function(oneService){
			Service = oneService;
            done();
		});
	});
		it('And I get a \'Room\'',function(done){
			room.getDefaultRoom(function(oneRoom){
				Room =  oneRoom;
				done();
			});
		});

	it('When I create an \'out-of-order\' in the \'room\'',function(done){
		outOfOrdersJson = {
			roomId : Room._id,
			from : moment().add(constant.ADDFROM, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
			to : moment().add(constant.ADDTO, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
			title : nameOutOfOrders,
			sendEmail : outOfOrderValues.sendEmail
		};
		outOfOrder.create(outOfOrdersJson, function(err,res){
			outOfOrdersJson = res.body;
	     	expect(res.status).to.equal(status.OK);
	        done();
		});
	});
		it('And I create a \'location\'',function(done){
			locationJson = {
				name       : 'location Test Bdt',
				customName : 'location Test Bdt',
				description: 'This is the location Test1'
			};
			location.create(locationJson, function (err, res) {
				locationJson = res.body;
				expect(res.status).to.equal(status.OK);
				done();
			});
		});
			it('And I create a \'resource\'',function(done) {
				resourceJson = {
					name: name,
					customName:resources.resourcusname,
					fontIcon: resources.resourfonticon,
			  		from: resources.resourfrom,
					description: resources.resourdesc
				};
				resource.create (resourceJson, function(err,res){
					resourceJson = res.body;
					expect(res.status).to.equal(status.OK);
					done();
				});
			});

	it('Then I assigned the \'location\' and \'resource\' to the room',function(done){
		room.getRooms(function(err,res){
			var json = {locationId : locationJson._id, resources : [resourceJson]};
        	room.update(json, function (err, res) {
	            expect(res.status).to.equal(status.OK);
	            done();
        	});
		});
	});
	});
});
