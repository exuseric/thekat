const byRefId = (arr, id) => arr.filter((el) => el.ref_id === parseInt(id));

const bySelfId = (arr, id) => arr.find((item) => item.id === parseInt(id));

export { bySelfId, byRefId };
