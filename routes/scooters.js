const express = require('express');
const router = express.Router();
let { getAllScooters, getScooterById, addScooter, updateScooter, removeScooter} = require('../controllers/scooterController');
const Scooter = require('../models/scooter');

const amqplib = require('amqplib');
var assert = require('assert');
var util = require('util');

var rabbit_user= "****";
var rabbit_pwd = "****";
var rabbit_host = "*****";
var rabbit_port = "5672";
var vhost = "";


async function produce(message){
  var amql_url = util.format("amqp://%s:%s@%s:%s/%s", rabbit_user, rabbit_pwd, rabbit_host, rabbit_port, vhost);

  console.log("Publishing");
    var conn = await amqplib.connect(amql_url, "heartbeat=60");
    var ch = await conn.createChannel()
    var exch = 'scoouter-3';
    var q = 'scoouter-logs';
    var rkey = 'zelovarnikey';
    await ch.assertExchange(exch, 'direct', {durable: true}).catch(console.error);
    await ch.assertQueue(q, {durable: true});
    await ch.bindQueue(q, exch, rkey);

    var msg = '2020-12-15 16:26:04,797 INFO http//:localhost:5000/scooters Correlation: 123 [com.example.demo.DemoUsers] - <* Klic storitve GET uporabniki *>';
    await ch.publish(exch, rkey, Buffer.from(msg));
    setTimeout( function()  {
        ch.close();
        conn.close();},  500 );
}

/**
 * @swagger
 * /scooter:
 *   get:
 *     description: All scooters
 *     responses:
 *       200:
 *         description: Returns all the scooters
 */
router.get('/', async (req, res) => {
	let response = await getAllScooters(req.query.s, req.query.page, req.query.limit);
	/*if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}*/

	/*produce().then(() =>{
		console.log("dela");
	  });
	  res.send(response);*/
});

/**
 * @swagger
 * /scooters/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The scooters ID.
 *     description: Get a scooter by id
 *     responses:
 *       200:
 *         description: Returns the requested scooter
 */
router.get('/:id', async (req, res) => {
	let response = await getScooterById(req.params.id);
	res.json(response);
});

/**
 * @swagger
 * /scooters:
 *   post:
 *     parameters:
 *      - in: body
 *        name: scooter
 *        description: New scooter
 *        schema:
 *          type: object
 *          properties:
 *            color:
 *              type: string
 *            manufacturer:
 *              type: string
 *            size:
 *              type: string
 *            isAvailable:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
	let body = {
		color: req.body.color,
		manufacturer: req.body.manufacturer,
		size: req.body.size,
		isAvailable: req.body.isAvailable
	};
	let response = await addScooter(body);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /scooters/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The scooter ID.
 *      - in: body
 *        name: scooter
 *        description: Update scooter
 *        schema:
 *          type: object
 *          properties:
 *            color:
 *              type: string
 *            manufacturer:
 *              type: string
 *            size:
 *              type: string
 *            isAvailable:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.patch('/:id', async (req, res) => {
	let color = null, manufacturer = null, size = null, isAvailable = null;
	if (req.body.color) {color = req.body.color}
	if (req.body.manufacturer) {manufacturer = req.body.manufacturer}
	if (req.body.size) {size = req.body.size}
	if (req.body.isAvailable) {isAvailable = req.body.isAvailable}
	let response = await updateScooter(req.params.id, color, manufacturer, size, isAvailable);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /scooter/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The scooters ID.
 *     description: Delete a scooter by id
 *     responses:
 *       200:
 *         description: Returns the requested scooter
 */
router.delete('/:id', async (req, res) => {
	let response = await removeScooter(req.params.id)
	try {
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(response);
	}
});

/**
 * @swagger
 * /scooters/getbymanufacturer/{manufacturer}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: manufacturer
 *        required: true
 *        type: string
 *        description: The scooters manufactuter.
 *     description: Get a scooter by manufactuter
 *     responses:
 *       200:
 *         description: Returns the requested scooter by its manufacturer
 */
router.get('/getbymanufactuter/:manufacturer', async (req, res) => {
	let response = await Scooter.findOne({manufacturer:req.params.manufacturer});
	res.json(response);
});

/**
 * @swagger
 * /scooter/getbysize/{size}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: size
 *        required: true
 *        type: string
 *        description: The scooter size.
 *     description: Get a scooters by its size
 *     responses:
 *       200:
 *         description: Returns the requested scooter
 */
 router.get('/getbysize/:size', async (req, res) => {
	let response = await Scooter.findOne({size:req.params.size});
	res.json(response);
});

/**
 * @swagger
 * /scooters/getbycolor/{color}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: color
 *        required: true
 *        type: string
 *        description: The scooters color.
 *     description: Get a scooter by its color
 *     responses:
 *       200:
 *         description: Returns the requested scooter
 */
 router.get('/getbycolor/:color', async (req, res) => {
	let response = await Scooter.findOne({color:req.params.color});
	res.json(response);
});

module.exports = router;
