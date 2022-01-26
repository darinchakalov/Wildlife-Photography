const express = require("express");

const initDB = require("./src/config/db.js");
const { PORT } = require("./src/config/constants.js");

const app = express();

require("./src/config/express.js")(app);
require("./src/config/router.js")(app);

initDB()
	.then(() => {
		app.listen(PORT, console.log(`App running at http://localhost:${PORT}`));
	})
	.catch((err) => {
		console.log("There was error initiating the DB connection ", err);
		//throw new Error("There was error initiating the DB connection ", err);
	});
