const list = (title, id) => ({ id, title });

const task = (title, id, list_id) => ({
  id,
  list_id,
  title,
  completed: false,
});

const subtask = (title, id, task_id) => ({
  id,
  task_id,
  title,
  completed: false,
});

export { list, task, subtask };
