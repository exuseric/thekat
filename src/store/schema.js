const list = (title, id) => ({ id, title });

const task = (title, id, ref_id) => ({
  id,
  ref_id,
  title,
  completed: false,
});

const subtask = (title, id, ref_id) => ({
  id,
  ref_id,
  title,
  completed: false,
});

export { list, task, subtask };
