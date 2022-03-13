import { getKnexClient } from "../helpers/knex-client";

function createEntity(table, data) {
  try {
    return getKnexClient()(table).insert(data);
  } catch (e) {
    console.error(e);
  }
}

function findEntity(table, filter = '*', condition) {
  if(condition) {
    return getKnexClient()(table).select(...filter).where(...condition);
  } else {
    return getKnexClient()(table).select(...filter);
  } 
}

// export default async function createUser(user) {
//   // const result = await knex('user').insert({ account_name: 'knex', user_id: insertedRows[0] })

//   try {
//     const result = await getKnexClient()('address').insert(user.address);
//     console.log(result);
//   } catch (e) {
//     console.log(e);
//   }

// }

export {
  createEntity,
  findEntity
}