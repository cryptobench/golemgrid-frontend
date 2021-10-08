<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="mt-20 sm:mt-4">
      <div class="md:grid md:grid-cols-8 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
          <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            Blender Task
            <span
              v-if="task_output.status == 'Not Started'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
            >
              {{ task_output.status }}
            </span>
            <span
              v-else-if="task_output.status == 'started'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
            >
              {{ task_output.status }}
            </span>
            <span
              v-else-if="task_output.status == 'finished'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              {{ task_output.status }}
            </span>
          </h3>
          <p class="ml-2 mt-1 text-sm text-gray-500 truncate">{{ task_output.unique_id }}</p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task Data
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Relationship
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="row in subtask_output" :key="row.status">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ row.provider }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ row.status }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ row.task_data }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ row.relationship }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
    this.interval1 = setInterval(() => this.subtask_data(), 2000)
    this.interval2 = setInterval(() => this.task_data(), 2000)
  },
  methods: {
    task_data() {
      if (this.task_output.status == "finished") {
        clearInterval(this.interval1)
      } else {
        this.axios
          .get("task/" + this.$route.params.id, {})
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
      }
    },
    subtask_data() {
      if (this.task_output.status == "finished") {
        clearInterval(this.interval2)
      } else {
        this.axios
          .get("subtask/" + this.$route.params.id, {})
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
      }
    },
  },
}
</script>
