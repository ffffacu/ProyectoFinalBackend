import fs from "fs";
import { productsModel } from "../dao/mongoDB/models/product.model.js";


// Esta funcion genera la creacion de 15 productos enviados desde un json a la base de datos de mongo.

export const seedProductsToDB = async () => {
  try {
    const product = await fs.promises.readFile("./src/seed/product.json", "utf-8");
    const parseProduct = await JSON.parse(product);
    await productsModel.insertMany(parseProduct);
    console.log("Productos agregados a la base de datos");
    
  } catch (error) {
    console.log(error);
  }
}