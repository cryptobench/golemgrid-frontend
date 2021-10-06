<template>
  <div>
    <p><b>TASK ID: </b>{{ task_output.unique_id }}</p>
    <p><b>TASK STATUS: </b>{{ task_output.status }}</p>
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>Status</th>
          <th>Task Data</th>
          <th>Relationship</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in subtask_output" :key="row.status">
          <td>{{ row.provider }}</td>
          <td>{{ row.status }}</td>
          <td>{{ row.task_data }}</td>
          <td>{{ row.relationship }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task_output: {},
      subtask_output: {},
    }
  },
  created() {
    this.interval = setInterval(() => this.subtask_data(), 2000)
    this.interval = setInterval(() => this.task_data(), 2000)
  },
  methods: {
    task_data() {
      this.$api
        .get("/task/" + this.$route.params.id, {})
        .then((res) => {
          console.log(res.data)
          this.task_output = res.data
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error.response)
        })
        .finally(() => {
          //Perform action in always
        })
    },
    subtask_data() {
      this.$api
        .get("/subtask/" + this.$route.params.id, {})
        .then((res) => {
          console.log(res.data)
          this.subtask_output = res.data
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error.response)
        })
        .finally(() => {
          //Perform action in always
        })
    },
  },
}
</script>
