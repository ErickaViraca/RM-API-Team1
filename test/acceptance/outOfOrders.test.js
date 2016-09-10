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

describe('Out-of-orders Acceptance Test', function () {
	this.timeout(config.timeout);
	var nameOutOfOrders = outOfOrderValues.title + randomstring.generate({ length: 6, charset: 'alphabetic'});
	var OutOfOrderPost = {};
	var OutOfOrders = {};
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
			OutOfOrders = res.body;
     	    expect(res.status).to.equal(status.OK);
     	    expect(res.body.length).to.be.at.least(constant.QUANT);
     	    expect(res.body.length).to.equal(OutOfOrders.length);
            done();
		});
	});

	it('GET /out-of-orders/{outOfOrderId}' , function(done){
		outOfOrder.getById(constant.PATH, OutOfOrder._id, function(err, res){
     	    expect(res.status).to.equal(status.OK);
     	    expect(res.body._id).to.equal(OutOfOrder._id);
     	    expect(res.body.roomId).to.equal(OutOfOrder.roomId);
     	    expect(res.body.from).to.equal(OutOfOrder.from);
     	    expect(res.body.to).to.equal(OutOfOrder.to);
     	    expect(res.body.title).to.equal(OutOfOrder.title);
     	    expect(res.body._v).to.equal(OutOfOrder._v);
     	    expect(res.body.sendEmail).to.equal(OutOfOrder.sendEmail);
     	    expect(res.body.Url).to.equal(OutOfOrder.Url);
         	done();
		});
	});

	it('GET /services/{serviceId}/rooms/{roomId}/out-of-orders' , function(done){
		outOfOrder.get(constant.FULPATH, function(err,res){
     	    expect(res.status).to.equal(status.OK);
     	    expect(res.body.length).to.equal(OutOfOrders.length);
            done();
		});
	});

	it('GET /services/{serviceId}/rooms/{roomId}/out-of-orders/{outOfOrderId}' , function(done){
		outOfOrder.getById(constant.FULPATH, OutOfOrder._id, function(err,res){
     	    expect(res.status).to.equal(status.OK);
     	    expect(res.body._id).to.equal(OutOfOrder._id);
     	    expect(res.body.roomId).to.equal(OutOfOrder.roomId);
     	    expect(res.body.from).to.equal(OutOfOrder.from);
     	    expect(res.body.to).to.equal(OutOfOrder.to);
     	    expect(res.body.title).to.equal(OutOfOrder.title);
     	    expect(res.body._v).to.equal(OutOfOrder._v);
     	    expect(res.body.sendEmail).to.equal(OutOfOrder.sendEmail);
     	    expect(res.body.Url).to.equal(OutOfOrder.Url);
            done();
		});
	});

	it('PUT /services/{serviceId}/rooms/{roomId}/out-of-orders/{outOfOrderId}', function(done){
		var outOfOrderJson = { sendEmail: outOfOrderValues.sendEmail, title: nameOutOfOrders};
	    outOfOrder.update(OutOfOrder._id, outOfOrderJson, function (err, res){
	        expect(res.status).to.equal(status.OK);
	        expect(res.body._id).to.equal(OutOfOrder._id);
     	    expect(res.body.roomId).to.equal(OutOfOrder.roomId);
     	    expect(res.body.from).to.equal(OutOfOrder.from);
     	    expect(res.body.to).to.equal(OutOfOrder.to);
     	    expect(res.body.title).to.equal(outOfOrderJson.title);
     	    expect(res.body._v).to.equal(OutOfOrder._v);
     	    expect(res.body.sendEmail).to.equal(outOfOrderJson.sendEmail);
     	    expect(res.body.Url).to.equal(OutOfOrder.Url);
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
	     	    expect(res.body.roomId).to.equal(outOfOrdersJsonPost.roomId);
	     	    expect(res.body.from).to.equal(outOfOrdersJsonPost.from);
	     	    expect(res.body.to).to.equal(outOfOrdersJsonPost.to);
	     	    expect(res.body.title).to.equal(outOfOrdersJsonPost.title);
	     	    expect(res.body.sendEmail).to.equal(outOfOrdersJsonPost.sendEmail);
	            done();
			});
		});
	});

	it('DELETE /services/{serviceId}/rooms/{roomId}/out-of-orders/{outOfOrderId}', function(done){
	    outOfOrder.delete(OutOfOrderPost._id, function (err, res){
	    	expect(res.status).to.equal(status.OK);
	    	outOfOrder.getById(constant.FULPATH, OutOfOrderPost._id, function(err,res){
		        expect(res.status).to.equal(status.NOT_FOUND);
		     	done();
	    	});
		});
	});

});
