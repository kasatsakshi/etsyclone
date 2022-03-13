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

export {
  createEntity,
  findEntity
}