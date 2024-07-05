const router = require("express").Router();
const student = require("../models/student");
let Student = require("../models/student");

router.route("/add").post(async(req, res) => {
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const name = req.body.name;

    const newStudent = new Student({
        name,
        age,
        gender
    });

    newStudent.save().then(() => {
        res.json("Student Added");
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/").get((req, res) => {
    Student.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
    let id = req.params.id;
    const { name, age, gender } = req.body;

    const updatesutent = {
        name,
        age,
        gender
    }

    try {
        const update = await student.findByIdAndUpdate(id, updatesutent, { new: true });
        if (update) {
            res.status(200).send({ status: "User updated", user: update });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error updating user", error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).send({ status: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error", error: err.message });
    }
});


  router.route("/get/:id").get(async (req, res) => {
    try {
        let id = req.params.id;

        const user = await student.findById(id);

        if (user) {
            res.status(200).send({ status: "User fetched", user: user });
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error", error: err.message });
    }
});



module.exports = router;
