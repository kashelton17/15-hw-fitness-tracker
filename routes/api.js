const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(each => {
        res.json(each);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

router.post('/api/workouts', (req, res) => {
    try {
        Workout.create(req.body).then((dbWorkout) => {
            res.json(dbWorkout);
        })
    } catch (err) {
          res.status(400).json(err);
      };
})


module.exports = router