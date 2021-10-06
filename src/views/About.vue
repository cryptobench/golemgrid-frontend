<template>
  <div>
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
        <tr v-for="row in output" :key="row.status">
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
      output: {},
    }
  },
  created() {
    this.submitForm()
  },
  methods: {
    submitForm() {
      this.$api
        .get("/subtask/all", {})
        .then((res) => {
          console.log(res.data)
          this.output = res.data
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
