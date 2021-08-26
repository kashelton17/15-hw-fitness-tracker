const router = require("express").Router();
const mongoose = require('mongoose');
const Workout = require("../models/Workout");

router.get("/api/workouts", async (req, res) => {
    try {
        await Workout.aggregate([{ "$addFields": {"totalDuration": {$sum: "$exercises.duration" },"totalWeight": {$sum: "$exercises.weight" }, "totalReps": {$sum: "$exercises.reps" },"totalSets": {$sum: "$exercises.sets" }}}]).sort({day: 1}).then(each => {
            res.json(each);
            console.log(each)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    };
})

router.post('/api/workouts', async (req, res) => {
    try {
        await Workout.create(req.body).then((dbWorkout) => {
            res.json(dbWorkout);
        })
    } catch (err) {
          res.status(400).json(err);
      };
})

router.get("/api/workouts/range", async (req, res) => {
    try {
        await Workout.aggregate([{ "$addFields": {"totalDuration": {$sum: "$exercises.duration" },"totalWeight": {$sum: "$exercises.weight" }, "totalReps": {$sum: "$exercises.reps" },"totalSets": {$sum: "$exercises.sets" }}}]).sort({day: 1}).then((dbWorkout) => {
            res.json(dbWorkout);
            console.log(dbWorkout)
        })
    } catch (err) {
      res.status(400).json(err);
    };
});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        await Workout.findByIdAndUpdate(
            { _id: req.params.id }, {$push: { exercises: req.body }}
          ).then((dbWorkout) => {
            res.json(dbWorkout);
            console.log(dbWorkout)
          })
    } catch(err) {
        console.log(err)
        res.status(400).json(err);
    };
});


module.exports = router