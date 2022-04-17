import { createEntity, findEntity, findOneEntity, findByNameEntity } from "../models";
import { getKnexClient } from "../helpers/knex-client";
import { decodeToken } from "../helpers/auth";
import UserFavorites from '../models/userFavorites';
import Inventory from '../models/inventory';

export async function getProducts(req, res) {
    const products = await findEntity(Inventory);
    let total = 0
    await Promise.all(
        products.map(async (product) => {
            const temp = await findEntity('orderDetails', ['orderQuantity'], ['inventoryId', product.id]);
            total = temp.length;
            product.totalSales = total;
        })
    )

    return res.status(200).json(products);
}

export async function favoriteProduct(req, res) {
    const input = req.body
    await createEntity('userFavorites', input);
    const findFavorites = await findEntity('userFavorites', ['*'], ['userId', input.userId]);

    return res.status(200).json(findFavorites);
}

export async function deleteFavoriteProduct(req, res) {
    const input = req.body
    await getKnexClient()('userFavorites').where('userId', input.userId).where('inventoryId', input.inventoryId).del();
    const findFavorites = await findEntity('userFavorites', ['*'], ['userId', input.userId]);
    return res.status(200).json(findFavorites);
}

export async function getUserFavorites(req, res) {
    const token = req.headers.authorization;
    const payload = await decodeToken(token);
    const userId = payload.data.id;
    const findFavorites = await findEntity(UserFavorites, {'userId': userId});
    const response = [];
    await Promise.all(
        findFavorites.map(async (product) => {
            const temp = await findOneEntity(Inventory, {'_id' : product.inventoryId});
            response.push(temp[0]);
        })
    )

    return res.status(200).json(response);
}

export async function searchProductsByName(req, res) {
    let products = [];
    if(req.params.name) {
        const input = '%' + req.params.name + '%';''
        products = await findByNameEntity('inventory', ['*'], ['name', 'LIKE', input]);
    } else {
       products =  await findEntity('inventory', ['*']);
    }
    return res.status(200).json(products);
}