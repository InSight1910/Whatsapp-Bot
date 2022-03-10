import { Schema, model } from "mongoose";
import { IVendor } from "../interfaces/Vendor";

const VendorSchema = new Schema<IVendor>(
	{
		cellphoneNumber: {
			type: String,
		},
		quantitySales: { type: Number },
	},
	{ collection: "Vendors" }
);

const VendorModel = model<IVendor>("Vendor", VendorSchema);
export default VendorModel;
