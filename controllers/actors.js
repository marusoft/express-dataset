const db = require('../database/index');
const helper = require('../helperUtils/actor');

const { orderEventsInDescendingOrder, orderByLoginAlphabeticalOrder, orderByNumberOfEvents, orderByComplexity, orderByStreak, removeStreakAndCreatedAtFromArray, removeEventCountAndCreatedAtFromArray, sortbyDate } = helper;



var getAllActors = (req, res) => {
	db.find({}, function (err, docs) {
		let actors = docs.map(event => { 
			const actorObject = event.actor;
			const createdAt = event.created_at;
			const result = {...actorObject, createdAt};     
			return result;
		});
		actors = orderByLoginAlphabeticalOrder(actors);
		actors = orderByNumberOfEvents(actors);
		actors = orderEventsInDescendingOrder(actors);
		actors = orderByComplexity(actors);
		actors = removeEventCountAndCreatedAtFromArray(actors);

		res.status(200).json(actors);
	});
};

var updateActor = (req, res) => {
	const {body} = req;
	const actorId = body.id;
	const arrayExtract=Object.keys(body);
	const notVAlid = arrayExtract.every (element =>
    ['id', 'login', 'avatar_url'].includes (element)
  );
  if (!notVAlid) {
    return res.status(400).json();
  }
	db.findOne({ "actor.id" : actorId }, function(err, doc) {
		if(!doc) {
			res.status(404).json();
			return;
		}
		db.update({ _id: doc._id }, {$set: { "actor.avatar_url" : body.avatar_url }},
		 {multi: true}, function(err, numRepl) {
			res.status(200).json();
		 })
	})
};

var getStreak = (req, res) => {
	db.find({}, function (err, docs) {
		let actors = docs.map(event => {
			const actorObject = event.actor
			const createdAt = event.created_at
			const result = {...actorObject, createdAt}
			return result;
		});

		actors = sortbyDate(actors);
		actors = orderByStreak(actors);
		actors = removeStreakAndCreatedAtFromArray(actors);

		res.status(200).json(actors);
	});
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















