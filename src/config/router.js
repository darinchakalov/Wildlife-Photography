const homeController = require("../controllers/homeController.js");
const authController = require("../controllers/authController.js");
const postController = require("../controllers/postController.js");
const profileController = require("../controllers/profileController.js");
const nonExisitingPagesController = require("../controllers/nonExistingPagesController.js");

module.exports = (app) => {
	app.use(homeController);
	app.use(authController);
	app.use(postController);
	app.use(profileController);
	app.use(nonExisitingPagesController);
};
