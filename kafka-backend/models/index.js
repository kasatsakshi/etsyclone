function createEntity(DB) {
  try {
    return DB.save();
  } catch (e) {
    console.error(e);
    return null;
  }
}

function findEntity(DB, condition, filter) {
  try {
    if (filter) {
      return DB.find(condition, filter);
    }
    return DB.find(condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function findOneEntity(DB, condition, filter) {
  try {
    if (filter) {
      return DB.findOne(condition, filter);
    }
    return DB.findOne(condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function updateEntity(DB, condition, data) {
  try {
    return DB.update(data).where(...condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function updateOneEntity(DB, condition, data) {
  try {
    return DB.updateOne(data).where(condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function deleteEntity(DB, condition) {
  try {
    return DB.deleteMany(condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function deleteOneEntity(DB, condition) {
  try {
    return DB.deleteOne(condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export {
  createEntity,
  findEntity,
  findOneEntity,
  updateEntity,
  updateOneEntity,
  deleteEntity,
  deleteOneEntity,
};
