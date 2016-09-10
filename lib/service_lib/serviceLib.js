/**
 * ServiceLib Module
 * @fileoverview ServiceLib module Execute the GET, POST, PUT and DELETE, to the Service resource.
 * @author  Ericka.Viraca@fundacion-jala.org (Ericka Viraca Silicoana)
 * @version 1.0.0
 * @module service_lib/serviceLib
 */
 
 /**Manager*/
 var requireManager = require('../manager_lib/requireManagerLib.js');
 var requestManager = requireManager.getRequireRequestManager();
 var resourceManager = requireManager.getRequireResourceManager();
 var LogManagement = requireManager.getRequireLogManagement();
 /**Variables*/
var request = requestManager.getRequestTokenLib();
var resource = resourceManager.getResource();
var constant = resourceManager.getConstantVariables();
var method = resourceManager.getRequestMethod();

/**
 * GETS (get) all the services.
 * @param {function} callback contains the error and the response.
 */
module.exports.get = function(callback) {
	var endPoint = resource.services;
	request.get(endPoint, function(err, res) {
		LogManagement.log(resource.services, endPoint, method.GET, err, res);
		callback(err, res);
	});
};

/**
 * This method GETS (getById) a specific Service by Id.
 * @param {String} idService to execute the GET resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.getById = function(idService, callback) {
	var endPoint = resource.services + '/' + idService;
	request.get(endPoint, function(err, res) {
		LogManagement.log(resource.services, endPoint, method.GET, err, res);
		callback(err, res);
	});
};

/**
 * This method POST (create) a new service on a specific URI.
 * @param {String} serviceJson to execute the POST resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.create = function (serviceJson, callback) {
	var endPoint = resource.services + "?type=exchange";
	request.create(endPoint, serviceJson, function(err,res){
		LogManagement.log(resource.services, endPoint, method.POST, err, res);
		callback(err,res);
	});
};

/**
 * This method PUT (update) an existent service on a specific URI.
 * @param {String} idService to execute the PUT resource.
 * @param {String} serviceJson to execute the PUT resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.update = function(idService, serviceJson, callback) {
	var endPoint = resource.services + '/' + idService;
	request.update(endPoint, serviceJson, function(err,res){
		LogManagement.log(resource.services, endPoint, method.PUT, err, res);
		callback(err,res);
	});
};

/**
 * This method DELETE (delete) an existent service on a specific URI.
 * @param {String} idService to execute the DELETE resource.
 * @param {function} callback contains the error and the response.
 */
module.exports.delete = function(idService, callback){
	var endPoint = resource.services + '/' +  idService;
	request.delete(endPoint, function(err, res) {
		LogManagement.log(resource.services, endPoint, method.DELETE, err, res);
		callback(err, res);
	});
};

/**
 * This method GETS (getOneServiceExistent) an aleatory service.
 * @param {function} callback contains the service object.
 */
module.exports.getDefaultService = function(callback) {
	var endPoint = resource.services;
	request.get(endPoint, function(err, res){
		var oneService = res.body;
		callback(oneService[constant.INDEXSERVICE]);
	});
};
