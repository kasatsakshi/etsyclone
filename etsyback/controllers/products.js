import { createEntity, findEntity, findByNameEntity } from "../models";
import { getKnexClient } from "../helpers/knex-client";
import knex from "knex";


export async function getProducts(req, res) {
    const products = await findEntity('inventory', ['*']);
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
    const { id } = req.params
    const findFavorites = await findEntity('userFavorites', ['*'], ['userId', id]);
    const response = [];
    await Promise.all(
        findFavorites.map(async (product) => {
            const temp = await findEntity('inventory', ['*'], ['id', product.inventoryId]);
            response.push(temp[0]);
        })
    )

    return res.status(200).json(response);
}

export async function searchProductsByName(req, res) {
    const input = '%' + req.params.name + '%';
    const products = await findByNameEntity('inventory', ['*'], ['name', 'LIKE', input]);
    return res.status(200).json(products);
}