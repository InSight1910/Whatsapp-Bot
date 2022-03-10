import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/Product";

const ProductSchema = new Schema<IProduct>(
	{
		name: { type: String },
		price: { type: Number },
	},
	{ collection: "products" }
);

export default model<IProduct>("Product", ProductSchema);
