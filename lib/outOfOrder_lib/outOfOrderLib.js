/**
 * OutOfOrdersLib Module
 * @fileoverview OutOfOrderLib module Execute the GET, POST, PUT and DELETE, to the OutOfOrder resource.
 * @author  Ericka.Viraca@fundacion-jala.org (Ericka Viraca Silicoana)
 * @version 1.0.0
 * @module Out-Of-Orders_lib/OutOfOrderLib
 */

 /**Manager*/
 var requireManager = require('../manager_lib/requireManagerLib.js');
 var requestManager = requireManager.getRequireRequestManager();
 var resourceManager = requireManager.getRequireResourceManager();
 var endPointManager = requireManager.getRequireEndPoinManager();
 var LogManagement = requireManager.getRequireLogManagement();
 /**Varibles*/
var requestGets = requestManager.getRequestLib();
var requestPostDeletePut = requestManager.getRequestTokenLib();
var constant = resourceManager.getConstantVariables();
var resource = resourceManager.getResource();
var method = resourceManager.getRequestMethod();
var service = endPointManager.getService();
var room = endPointManager.getRoom();

/**
 * GETS (get) all the out-of-orders.
 * @param {Integer} withPath to execute the GET resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.get = function(Path, callback) {
	this.buildBaseEndPoint(function(baseEndPoint){
		var endPoint = resource.outOfOrders;
		if (Path == constant.PATH) {
			requestGets.get(endPoint, function(err, res) {
				LogManagement.log(resource.outOfOrders, endPoint, method.GET, err, res);
				callback(err, res);
			});
		}
		else {
			endPoint = baseEndPoint + '/' + resource.outOfOrders;
			requestGets.get(endPoint, function(err, res) {
				LogManagement.log(resource.outOfOrders, endPoint, method.GET, err, res);
				callback(err, res);
			});
		}
	});
};

/**
 * This method GETS (getById) a specific out-of-order by Id.
 * @param {Integer} withPath to execute the GET resource.
 * @param {String} idOutOfOrder to execute the GET resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.getById = function(Path, idOutOfOrder, callback) {
	this.buildBaseEndPoint(function(baseEndPoint){
		var endPoint = resource.outOfOrders + '/' + idOutOfOrder;
		if (Path == constant.PATH) {
			requestGets.get(endPoint, function(err, res) {
				LogManagement.log(resource.outOfOrders, endPoint, method.GET, err, res);
			callback(err, res);
			});
		}
		else {
			endPoint = baseEndPoint + resource.outOfOrders + '/' + idOutOfOrder;
			requestGets.get(endPoint, function(err, res) {
				LogManagement.log(resource.outOfOrders, endPoint, method.GET, err, res);
			callback(err, res);
			});
		}
	});
};

/**
 * This method POST (create) a new out-of-order on a specific URI.
 * @param {Object} outOfOrdersJson to execute the POST resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.create = function (outOfOrdersJson, callback) {
	this.buildBaseEndPoint(function(baseEndPoint){
		var endPoint = baseEndPoint + resource.outOfOrders;
		requestPostDeletePut.create(endPoint, outOfOrdersJson, function(err,res){
			LogManagement.log(resource.outOfOrders, endPoint, method.POST, err, res);
			callback(err,res);
		});
	});
};

/**
 * This method PUT (update) an existent out-of-order on a specific URI.
 * @param {String} idOutOfOrder to execute the PUT resource.
 * @param {Object} outOfOrdersJson to execute the PUT resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.update = function(idOutOfOrder, outOfOrdersJson, callback) {
	this.buildBaseEndPoint(function(baseEndPoint){
		var endPoint = baseEndPoint + resource.outOfOrders + '/' + idOutOfOrder;
		requestPostDeletePut.update(endPoint, outOfOrdersJson, function(err,res){
			LogManagement.log(resource.outOfOrders, endPoint, method.PUT, err, res);
			callback(err,res);
		});
	});
};

/**
 * This method DELETE (delete) an existent out-of-order on a specific URI.
 * @param {String} idOutOfOrder to execute the DELETE resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.delete = function(idOutOfOrder, callback){
	this.buildBaseEndPoint(function(baseEndPoint){
		var endPoint = baseEndPoint + resource.outOfOrders + '/' +  idOutOfOrder;
		requestPostDeletePut.delete(endPoint, function(err, res) {
			LogManagement.log(resource.outOfOrders, endPoint, method.DELETE, err, res);
			callback(err, res);
		});
	});
};


module.exports.buildBaseEndPoint = function(callback) {
	service.getDefaultService(function(oneService){
		var baseEndpointServiceRoom = resource.services + '/' + oneService._id;
		room.getDefaultRoom(function(oneRoom){
			baseEndpointServiceRoom = baseEndpointServiceRoom + resource.rooms + '/' + oneRoom._id;
			callback(baseEndpointServiceRoom);
		});
	});
};
