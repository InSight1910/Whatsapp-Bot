const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

(async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.error(error);
	}
})();
