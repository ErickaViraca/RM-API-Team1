var expect = require('chai').expect;
var randomstring = require("randomstring");
var moment = require("moment");
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var outOfOrder = endPointManager.getOutOfOrder();
var config = requireManager.getRequireConfig();
var outOfOrderValues = resourceManager.getOutOfOrdersValues();
var constant = resourceManager.getConstantVariables();
var status = resourceManager.getStatus();
var room = endPointManager.getRoom();

describe('Out-of-orders Smoke Test', function () {
	this.timeout(config.timeout);
	var nameOutOfOrders = outOfOrderValues.title + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var OutOfOrderPost = {};
	var OutOfOrder = {};

	beforeEach(function(done){
		room.getDefaultRoom(function(oneRoom){
			var outOfOrdersJson = {
				roomId : oneRoom._id,
				from : moment().add(constant.ADDFROM, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
				to : moment().add(constant.ADDTO, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
				title : nameOutOfOrders,
				sendEmail : outOfOrderValues.sendEmail
			};
			outOfOrder.create(outOfOrdersJson, function(err,res){
				OutOfOrder = res.body;
	     	    expect(res.status).to.equal(status.OK);
	            done();
			});
		});
	});	

	afterEach(function(done){
		outOfOrder.delete(OutOfOrder._id, function(err,res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('GET /out-of-orders' , function(done){
		outOfOrder.get(constant.PATH, function(err,res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('GET /out-of-orders/{outOfOrderId}' , function(done){
		outOfOrder.getById(constant.PATH, OutOfOrder._id, function(err, res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('GET /services/{serviceId}/rooms/{roomId}/out-of-orders' , function(done){
		outOfOrder.get(constant.FULPATH, function(err,res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('GET /services/{serviceId}/rooms/{roomId}/out-of-orders/{outOfOrderId}' , function(done){
		outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('PUT /services/{serviceId}/rooms/{roomId}/out-of-orders/{outOfOrderId}', function(done){
		var outOfOrderJson = { title: nameOutOfOrders };
	    outOfOrder.update(OutOfOrder._id, outOfOrderJson, function (err, res){
	        expect(res.status).to.equal(status.OK);
	     	done();
	    });
	});

	it('POST /services/{serviceId}/rooms/{roomId}/out-of-orders', function(done){
		room.getDefaultRoom(function(oneRoom){
			var outOfOrdersJsonPost = {
				roomId : oneRoom._id,
				from : moment().add(constant.ADDFROM, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
				to : moment().add(constant.ADDTO, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
				title : nameOutOfOrders,
				sendEmail : outOfOrderValues.sendEmail
			};
		    outOfOrder.create(outOfOrdersJsonPost, function(err,res){
				OutOfOrderPost = res.body;
	     	    expect(res.status).to.equal(status.OK);
	            done();
			});
		});
	});

	it('DELETE /services/{serviceId}/rooms/{roomId}/out-of-orders/{outOfOrderId}', function(done){
	    outOfOrder.delete(OutOfOrderPost._id, function (err, res){
	        expect(res.status).to.equal(status.OK);
	     	done();
	    });
	});

});
