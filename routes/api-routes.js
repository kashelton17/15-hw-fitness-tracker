const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", async (req, res) => {
    try {
        await Workout.find({}).then(each => {
            res.json(each);
        })
    } catch (err) {
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
       await Workout.find({}).then((dbWorkout) => {
            res.json(dbWorkout);
        })
    } catch (err) {
      res.status(400).json(err);
    };
});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        await Workout.findByIdAndUpdate(
            { _id: req.params.id }, { exercises: req.body }
          ).then((dbWorkout) => {
            res.json(dbWorkout);
          })
    } catch(err) {
      res.status(400).json(err);
    };
});


module.exports = router