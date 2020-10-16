const byRefId = (arr, id) => arr.filter((el) => el.ref_id === id);

const bySelfId = (arr, id) => arr.find((item) => item.id === id);

export { bySelfId, byRefId };
