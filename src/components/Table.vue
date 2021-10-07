<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="pb-5 border-b border-gray-200">
          <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
              Blender Task
            </h3>
            <p class="ml-2 mt-1 text-sm text-gray-500 truncate">{{ task_output.unique_id }}</p>
          </div>
          <!-- This example requires Tailwind CSS v2.0+ -->
          <span
            v-if="task_output.status == 'started'"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            {{ task_output.status }}
          </span>
          <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {{ task_output.status }}
          </span>
        </div>
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
import axios from "axios"
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
      axios
        .get("http://localhost:8002/v1/task/" + this.$route.params.id, {})
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
      axios
        .get("http://localhost:8002/v1/subtask/" + this.$route.params.id, {})
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
