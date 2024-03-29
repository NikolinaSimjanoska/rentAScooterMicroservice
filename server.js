const express = require('express');
const connectDb = require("./config/db");
const { scooters } = require("./routes/index");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'RentAScooter REST API',
			description: "A REST API built with Express and MongoDB. This API provides scooters and the possibility of renting one."
		},
	},
	apis: ["./routes/scooters.js"]
}

app.use('/scooters', scooters)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(process.env.PORT || 5000, () => console.log('Daar vat hy!!!'));
