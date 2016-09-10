/**
 * RoomLib Module
 *
 * @fileoverview roomLib module that executes GET and PUT(update) requests for Rooms.
 * @author  Jimmy.Romero@fundacion-jala.org (Jimmy Joel Romero Sejas)
 * @version 1.0.0
 * @module room_lib/roomLib
 */

 /**Manager*/
 var requireManager = require('../manager_lib/requireManagerLib.js');
 var requestManager = requireManager.getRequireRequestManager();
 var resourceManager = requireManager.getRequireResourceManager();
 var endPointManager = requireManager.getRequireEndPoinManager();
 var LogManagement = requireManager.getRequireLogManagement();
 /**Variables*/
var request = requestManager.getRequestTokenLib();
var resource = resourceManager.getResource();
var room = endPointManager.getRoom();
var service = endPointManager.getService();
var constant = resourceManager.getConstantVariables();
var method = resourceManager.getRequestMethod();
var oneRoom = {};

/**
 * Module to GET all existent Rooms.
 *
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRooms = function(callback){
	var endPoint = resource.rooms;
	request.get(endPoint, function(err, res){
		oneRoom = res.body;
		LogManagement.log(resource.rooms, endPoint, method.GET, err, res);
		callback(err, res);
	});
};

/**
 * Module to GET a Room by Id.
 *
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRoomById = function(callback){
	this.getDefaultRoom(function (oneRoom) {
		var endPoint = resource.rooms + '/' + oneRoom._id;
		request.get(endPoint, function(err, res){
			LogManagement.log(resource.rooms, endPoint, method.GET, err, res);
			callback(err, res);
		});
	});
};

/**
 * Module to GET a Room by Id.
 *
 * @roomUnderTest {variable} roomUnderTest Contains the random position.
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRoomByIdRandom = function(roomUnderTest, callback){
	var endPoint = resource.rooms + '/' + oneRoom[roomUnderTest]._id;
	request.get(endPoint, function(err, res){
		LogManagement.log(resource.rooms, endPoint, method.GET, err, res);
		callback(err, res);
	});
};

/**
 * Module to UPDATE a Room by Id.
 *
 * @param {json} roomJson Contains a Json file with room attributes to update the room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.update = function (roomJson, callback) {
	this.getDefaultRoom(function (oneRoom) {
		var endPoint = resource.rooms + '/' + oneRoom._id;
		request.update(endPoint, roomJson, function (err, res) {
			LogManagement.log(resource.rooms, endPoint, method.PUT, err, res);
			callback(err, res);
	 	});
	});
};

/**
 * Module to GET all existent Rooms, given a Service Id.
 *
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRoomByServices = function(callback){
	service.getDefaultService(function (oneService) {
		var endPoint = resource.services + '/' + oneService._id + resource.rooms;
		request.get(endPoint, function(err, res){
			LogManagement.log(resource.rooms, endPoint, method.GET, err, res);
			callback(err, res);
		});
	});
};

/**
 * Module to GET a Room by Id, given a Service Id.
 *
 * @param {function} callback Contains the error and the response.
 */
module.exports.getRoomByIdAndServices = function(callback){
	this.getDefaultRoom(function (oneRoom) {
		service.getDefaultService(function (oneService) {
			var endPoint = resource.services + '/' + oneService._id + resource.rooms + '/' + oneRoom._id;
			request.get(endPoint, function(err, res){
				LogManagement.log(resource.rooms, endPoint, method.GET, err, res);
				callback(err, res);
			});
		});
	});
};

/**
 * Module to UPDATE a Room by Id, given a Service Id.
 *
 * @param {json} roomJson Contains a Json file with room attributes to update the room.
 * @param {function} callback Contains the error and the response.
 */
module.exports.updateRoomByIdAndServices = function(roomJson, callback){
	this.getDefaultRoom(function (oneRoom) {
			service.getDefaultService(function (oneService){
			var endPoint = resource.services + '/' + oneService._id + resource.rooms + '/' + oneRoom._id;
			request.update(endPoint, roomJson, function(err, res){
				LogManagement.log(resource.rooms, endPoint, method.PUT, err, res);
				callback(err, res);
			});
		});
	});
};

/**
 * This method GETS (getOneRoomExistent) an aleatory service.
 * @param {function} callback contains the room object.
 */
// module.exports.getDefaultRoom = function(callback) {
// 	var endPoint = resource.rooms;
// 	request.get(endPoint, function(err, res){
// 		var oneRoom = res.body;
// 		console.log(oneRoom);
// 		callback(oneRoom[constant.INDEX]);
// 	});
// };

module.exports.getDefaultRoom = function(callback) {
	service.getDefaultService(function (oneService) {
		var endPoint = resource.services + '/' + oneService._id + resource.rooms;
		request.get(endPoint, function(err, res){
			var oneRoom = res.body;
			callback(oneRoom[constant.INDEX]);
		});
	});
};
