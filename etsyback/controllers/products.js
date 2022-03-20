import { findEntity } from "../models";

export async function getProducts(req, res) {

    const products = await findEntity('inventory', ['*']);
    return res.status(200).json(products);

}