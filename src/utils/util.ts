const { ACCOUNT_SID, ACCOUNT_SECRET } = process.env;
const client = require("twilio")(ACCOUNT_SID, ACCOUNT_SECRET);

const getUserData = async () => await await client.messages.list({ limit: 1 });

const sendMessage = async ({
	body,
	to,
	from,
}: {
	body: string;
	to: string;
	from: string;
}) => {
	await client.messages.create({ body, to, from });
};

const NumberFormatter = new Intl.NumberFormat("es-CL", {
	style: "currency",
	currency: "CLP",
	minimumFractionDigits: 0,
});

export { getUserData, sendMessage, NumberFormatter };
