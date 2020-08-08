const express = require("express");
const fs = require("fs");
const router = express.Router();

const studentJSONPath = "json/students.json";

// Get all Students
router.get("/", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(studentJSONPath));
        res.send({ data, error: null });
    } catch (e) {
        res.status(500).send({ data: null, error: e });
    }
});

// Get Specific Student
router.get("/:id", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(studentJSONPath));
        data = data.filter((ele) => ele["studentId"] == req.params.id);
        if (!data) throw `No student with ID:${req.params.id}`;
        res.send({ data, error: null });
    } catch (error) {
        res.status(404).send({ data: null, error });
    }
});

// Add a student
router.post("/", (req, res) => {
    try {
        let name = req.body.name;
        let data = JSON.parse(fs.readFileSync(studentJSONPath));

        let obj = {
            studentId: data.length,
            name,
        };
        data.push(obj);
        fs.writeFileSync(studentJSONPath, JSON.stringify(data, null, 2));
        res.status(200).send({ data: "Success", error: null });
    } catch (error) {
        res.status(500).send({ data: null, error });
    }
});
module.exports = router;
