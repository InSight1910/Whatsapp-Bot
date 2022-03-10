import express from "express";
require("dotenv/config");
import { NumberFormatter, getUserData, sendMessage } from "./src/utils/util";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { Commands as EnumCommands } from "./src/utils/enums";
import { listMessage, contactMessage, defaultMessage } from "./src/controller/";

require("./src/utils/database");

const app: express.Application = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

app.post("/", async (req, res) => {
	const userData: MessageInstance[] = await getUserData();
	switch (userData[0].body.split(" ")[0]) {
		case EnumCommands.Listar:
			listMessage(userData);
			break;
		case EnumCommands.Contactar:
			contactMessage(userData);
			break;
		default:
			defaultMessage(userData);
			break;
	}
});

app.put("/", (req, res) => {
	console.log(req);
	console.log(res);
});

app.listen(3000, () => {
	console.log("Server ready");
});
