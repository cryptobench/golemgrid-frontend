import api from "./api"

class UserService {
  submitBlender() {
    return api.get("all")
  }

  getTaskOverview() {
    return api.get("tasks/all")
  }

  blenderTaskData(task_id) {
    return api.get("task/" + task_id)
  }
  blenderSubtaskData(task_id) {
    return api.get("subtask/" + task_id)
  }
}

export default new UserService()
