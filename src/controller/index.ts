import { NumberFormatter, getUserData, sendMessage } from "../utils/util";

import VendorDB from "../model/Vendor";
import ProductDB from "../model/Product";
import { IVendor } from "../interfaces/Vendor";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { IProduct } from "../interfaces/Product";

const contactMessage = async (userData: MessageInstance[]) => {
	try {
		const dataMessage: MessageInstance = userData[0];
		const splitedMessage = dataMessage.body.split("!contactar")[1].trim();
		if (!splitedMessage)
			return sendMessage({
				body: "Debe enviar un mensaje con su consultar, intentelo nuevamente.",
				to: dataMessage.from,
				from: dataMessage.to,
			});
		const dataVendor: IVendor[] = await VendorDB.find({}).sort({
			quantitySales: 1,
		});
		sendMessage({
			body: splitedMessage,
			//body: "Your test code is 1234",
			to: `whatsapp:${dataVendor[0].cellphoneNumber}`,
			from: dataMessage.to,
		});
		sendMessage({
			body: `Pronto se estaran contactando para poder brindarle ayuda.`,
			to: dataMessage.from,
			from: dataMessage.to,
		});
	} catch (error) {
		console.log();
	}
};
const defaultMessage = (userData: MessageInstance[]) => {
	const dataMessage: MessageInstance = userData[0];
	sendMessage({
		body: "Por favor envia un: \n\t!listar <inicial>\n\t!contactar <mensaje>\npara poder brindarte ayuda",
		to: dataMessage.from,
		from: dataMessage.to,
	});
};

const listMessage = async (userData: MessageInstance[]) => {
	const dataMessage: MessageInstance = userData[0];
	const searchMessage: string = dataMessage.body.split("!listar")[1].trim();
	const dataProduct: IProduct[] = await ProductDB.find({
		name: new RegExp(searchMessage),
	}).limit(10);

	dataProduct.forEach((value: IProduct) => {
		sendMessage({
			body: `${value.name} tiene un precion de ${NumberFormatter.format(
				value.price
			)}`,
			from: dataMessage.to,
			to: dataMessage.from,
		});
	});
};

export { contactMessage, defaultMessage, listMessage };
