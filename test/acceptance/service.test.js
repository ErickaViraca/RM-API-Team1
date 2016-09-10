var expect = require('chai').expect;
/**Manager*/
var requireManager = require('../../lib/manager_lib/requireManagerLib.js');
var endPointManager = requireManager.getRequireEndPoinManager();
var resourceManager = requireManager.getRequireResourceManager();
/**Variables*/
var constant = resourceManager.getConstantVariables();
var service = endPointManager.getService();
var config = requireManager.getRequireConfig();
var status = resourceManager.getStatus();

describe ('Service Acceptance Test', function (){
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
	        expect(res.body.credential.username).to.equal(serviceJson.username);
	        expect(res.body.serviceUrl).to.include(serviceJson.hostname);
	        done();
	    });
	});

	it('GET /services' , function(done){
		service.get(function(err,res){
			expect(res.status).to.equal(status.OK);
			expect(res.body.length).to.be.at.least(constant.QUANT);
            done();
		});
	});

	it('GET /services/{serviceId}' , function(done){
		service.getById(servicePost._id, function(err,res){
     	    expect(res.status).to.equal(status.OK);
     	    expect(res.body.name).to.equal(servicePost.name);
     	    expect(res.body._id).to.equal(servicePost._id);
     	    expect(res.body.type).to.equal(servicePost.type);
     	    expect(res.body.version).to.equal(servicePost.version);
     	    expect(res.body.serviceUrl).to.equal(servicePost.serviceUrl);
     	    expect(res.body.impersonate).to.equal(servicePost.impersonate);
     	    expect(res.body.username).to.equal(servicePost.username);
     	    expect(res.body.expirationDate).to.equal(servicePost.expirationDate);
     	    expect(res.body._v).to.equal(servicePost._v);
     	    done();
		});
	});

	it('PUT /services/{serviceId}', function(done){
		var serviceJsonUpdate = { impersonate: true };
	    service.update(servicePost._id, serviceJsonUpdate, function (err, res){
	        expect(res.status).to.equal(status.OK);
	        expect(res.body.name).to.equal(servicePost.name);
     	    expect(res.body._id).to.equal(servicePost._id);
     	    expect(res.body.type).to.equal(servicePost.type);
     	    expect(res.body.version).to.equal(servicePost.version);
     	    expect(res.body.serviceUrl).to.equal(servicePost.serviceUrl);
     	    expect(res.body.impersonate).to.equal(serviceJsonUpdate.impersonate);
     	    expect(res.body.username).to.equal(servicePost.username);
     	    expect(res.body.expirationDate).to.equal(servicePost.expirationDate);
     	    expect(res.body._v).to.equal(servicePost._v);
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
