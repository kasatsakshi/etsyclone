import { getKnexClient } from "../helpers/knex-client";

function createEntity(DB) {
  try {
    return DB.save();
  } catch (e) {
    console.error(e);
  }
}

function findEntity(DB, condition, filter) {
  try {
    if(filter) {
      return DB.find(condition, filter);
    }
    return DB.find(condition);
  } catch (e) {
    console.error(e);
  }
}

function findOneEntity(DB, condition, filter) {
  try {
    if(filter) {
      return DB.findOne(condition, filter);
    }
    return DB.findOne(condition);
  } catch (e) {
    console.error(e);
  }
}

function updateEntity(DB, condition, data) {
  try {
    return DB.update(data).where(...condition);
  } catch (e) {
    console.error(e);
  }
}

function updateOneEntity(DB, condition, data) {
  try {
    return DB.update(data).where(condition);
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

async function findByNameEntity(table, filter = '*', condition) {
  try {
    return getKnexClient()(table).select(...filter).where(...condition);
  } catch (e) {
    console.error(e);
  }
}

export {
  createEntity,
  findEntity,
  findOneEntity,
  updateEntity,
  updateOneEntity,
  deleteEntity,
  findByNameEntity
}