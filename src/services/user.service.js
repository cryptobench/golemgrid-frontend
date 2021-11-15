import api from "./api"

class UserService {
  submitBlender() {
    return api.get("v1/all")
  }

  getTaskOverview() {
    return api.get("v1/tasks/all")
  }

  blenderTaskData(task_id) {
    return api.get("v1/task/" + task_id)
  }
  blenderSubtaskData(task_id) {
    return api.get("v1/subtask/" + task_id)
  }
}

export default new UserService()
