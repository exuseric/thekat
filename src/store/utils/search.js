const byReferenceId = (type, arr, id) => {
  switch (type) {
    case 'task':
      return arr.filter((task) => task.list_id === id)
    case 'subtask':
      return arr.filter((subtask) => subtask.task_id === id)
    default:
      console.error(`Could not find item with ${id} in ${type}`)
  }
}

const bySelfId = (arr, id) => arr.find((item) => item.id === id)

export { bySelfId, byReferenceId }
