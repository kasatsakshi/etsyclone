function updateOneEntity(DB, condition, data) {
  try {
    return DB.updateOne(data).where(condition);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export {
  updateOneEntity,
};
