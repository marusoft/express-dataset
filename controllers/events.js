const db = require('../database/index');
const helper = require('../helperUtils/event')

const { orderInAscendingOrderById } = helper;


var getAllEvents = (req, res) => {
	db.find({},{_id: 0 }, function (err, docs) {
		let result = orderInAscendingOrderById(docs);
		res.status(200).json(result);
	});
};

var addEvent =  (req, res) => {
	let { body } = req;
	db.findOne({id: body.id}, function (err, exist) {
		if (exist) {
			res.status(400).json();
			return;
		}
		db.insert([{...body}], function(err, docs) {
			res.status(201).json();
		});
 });
};


var getByActor = (req, res) => {
	const {actorId} = req.params;
	db.find({
				"actor.id": Number(actorId)
			}, {
				_id: 0
			}, function (err, docs) {
		docs.length ? 
		res.status(200).json(orderInAscendingOrderById(docs)) : res.status(404).json();
	})
};


var eraseEvents = (req, res) => {
	db.remove({}, { multi: true}, function(err, numRemoved) {
		res.status(200).json();
	})
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















