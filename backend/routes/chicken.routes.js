const express = require('express');
const { getChicken, setChicken, editChicken, deleteChicken, runChicken } = require('../controllers/chicken.controllers');
const router = express.Router();

router.get("/", getChicken);
router.post("/", setChicken);
router.put("/:id", editChicken); // remplacer une donnée
router.delete("/:id", deleteChicken);
router.patch("/run/:id", runChicken); // pouvoir incrementer toute une serie de donnes

module.exports = router