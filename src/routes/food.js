'use strict';

const express = require('express');

const { Food } = require('../models/index.js');

const router = express.Router();

router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);

//RESTful Route Handlers

async function getFood (req, res) {
    let allFood = await Food.findAll();
    res.status(200).json(allFood);
}

async function getOneFood (req, res) {
    const id = parseInt(req.params.id);
    let theFood = await Food.findOne({ where: { id: id }});
    res.status(200).json(theFood);
}

async function createFood (req, res) {
    let obj = req.body;
    let newFood = await Food.create(obj);
    res.status(200).json(newFood);
}

async function updateFood (req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    let food = await Food.findOne({ where: { id: id }});
    let updateFood = await food.update(obj);
    res.status(200).json(updateFood);
}

async function deleteFood (req, res) {
    const id = parseInt(req.params.id);
    let deletedFood = await Food.destroy({ where: { id: id }});
    res.status(200).json(deletedFood);
}

module.exports = router;