import { getKnexClient } from "../helpers/knex-client";

function createEntity(table, data) {
  try {
    return getKnexClient()(table).insert(data);
  } catch (e) {
    console.error(e);
  }
}

function findEntity(table, filter = '*', condition) {
  try {
    if(condition) {
      return getKnexClient()(table).select(...filter).where(...condition);
    } else {
      return getKnexClient()(table).select(...filter);
    } 
  } catch (e) {
    console.error(e);
  }
}

function updateEntity(table, data, condition) {
  try {
    return getKnexClient()(table).update(data).where(...condition);
  } catch (e) {
    console.error(e);
  }
}

function deleteEntity(table, condition) {
  try {
    return getKnexClient()(table).where(...condition).del();
  } catch (e) {
    console.error(e);
  }
}

export {
  createEntity,
  findEntity,
  updateEntity,
  deleteEntity
}