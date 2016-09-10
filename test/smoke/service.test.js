var expect = require('chai').expect;
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var service = endPointManager.getService();
var config = requireManager.getRequireConfig();
var status = resourceManager.getStatus();

describe('Service Smoke Test', function () {
	this.timeout(config.timeout);
	var servicePost = {};
	var serviceJson = {  "username": "administrator",
						 "hostname": "adds-exchange.group1.local",
						 "password": "P@ssw0rd" };

	before(function(done){
		service.get(function(err,res){
			if (typeof res.body[0] !== 'undefined') {
				service.getDefaultService(function(oneService){
					service.delete(oneService._id, function (err, res){
				        expect(res.status).to.equal(status.OK);
					        done();
				    });
				});
			}
		});
	});	

	after(function(done){
    	service.create(serviceJson, function (err, res){
	        expect(res.status).to.equal(status.OK);
	        done();
	    });
	});

	it('POST /services', function(done){ 
    	service.create(serviceJson, function (err, res){
    		servicePost = res.body;
	        expect(res.status).to.equal(status.OK);
	        done();
	    });
	});

	it('GET /services' , function(done){
		service.get(function(err,res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('GET /services/{serviceId}' , function(done){
		service.getById(servicePost._id, function(err,res){
     	    expect(res.status).to.equal(status.OK);
            done();
		});
	});

	it('PUT /services/{serviceId}', function(done){
		var serviceJsonUpdate = { impersonate: true };
	    service.update(servicePost._id, serviceJsonUpdate, function (err, res){
	        expect(res.status).to.equal(status.OK);
	     	done();
	    });
	});

	it('DELETE /services/{serviceId}', function(done){
		service.delete(servicePost._id, function (err, res){
		 	expect(res.status).to.equal(status.OK);
		 	service.getById(servicePost._id, function(err,res){
		        expect(res.status).to.equal(status.NOT_FOUND);
		     	done();
	    	});
		});
	});

});
