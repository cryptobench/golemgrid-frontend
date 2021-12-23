<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <div class="mt-20 sm:mt-4">
      <div class="md:grid md:grid-cols-8 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-2 md:col-start-2 ">
          <h3 class="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
            Blender Task
            <span
              v-if="task_output.status == 'Not Started'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
            >
              {{ task_output.status }}
            </span>
            <span
              v-if="task_output.status == 'Failed'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
            >
              {{ task_output.status }}
            </span>
            <span
              v-else-if="task_output.status == 'Started'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
            >
              {{ task_output.status }}
            </span>
            <span
              v-else-if="task_output.status == 'Finished'"
              class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              {{ task_output.status }}
            </span>
          </h3>
          <p class="ml-2 mt-1 text-sm text-gray-500 truncate">{{ task_output.unique_id }}</p>
        </div>
        <div v-if="task_output.status == 'Finished'" class="mt-5 md:mt-0 md:col-span-2 md:col-start-7">
          <button
            type="button"
            v-on:click="download_result"
            class="mt-2 -ml-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-golemblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download Result
            <DownloadIcon class="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
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
                  Frame
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
                  <span
                    v-if="row.status == 'Finished'"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {{ row.status }}
                  </span>

                  <span
                    v-if="row.status == 'Computing'"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                  >
                    {{ row.status }}
                  </span>

                  <span
                    v-if="row.status == 'Failed'"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >
                    {{ row.status }}
                  </span>
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
    <div class="bg-white">
      <div class="md:grid md:grid-cols-8 md:gap-6">
        <div class="mt-16 md:col-span-2 md:col-start-2 ">
          <h2 class="text-xl font-bold text-gray-900">Output</h2>

          <div class="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8">
            <div v-for="result in images" :key="result">
              <div class="relative">
                <div class="relative w-full rounded-lg overflow-hidden">
                  <img :src="this.static + result.file" class="w-full h-full object-center object-cover" />
                </div>
                <div class="relative mt-4">
                  <h3 class="text-sm font-medium text-gray-900">output</h3>
                  <p class="mt-1 text-sm text-gray-500">test</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service"
import { DownloadIcon } from "@heroicons/vue/solid"

export default {
  data() {
    return {
      task_output: {},
      subtask_output: {},
      images: {},
    }
  },
  components: {
    DownloadIcon,
  },

  created() {
    this.static = process.env.VUE_APP_STATIC_BASE_URL
    UserService.blenderTaskData(this.$route.params.id).then((response) => {
      this.task_output = response.data
      if (response.data.status == "finished") {
        UserService.blenderSubtaskResults(this.$route.params.id).then(
          (response) => {
            this.images = response.data
          },
          (error) => {
            this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          }
        )
        return
      } else {
        console.log(this.task_output.status)
        this.interval = setInterval(() => this.gatherdata(), 2000)
      }
    })
    UserService.blenderSubtaskData(this.$route.params.id).then((response) => {
      this.subtask_output = response.data
    })
  },
  methods: {
    download_result() {
      window.open(this.static + "media/" + this.$route.params.id + "/" + this.$route.params.id + ".zip", "_blank")
    },
    gatherdata() {
      UserService.blenderSubtaskResults(this.$route.params.id).then(
        (response) => {
          this.images = response.data
        },
        (error) => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        }
      )
      UserService.blenderTaskData(this.$route.params.id).then(
        (response) => {
          this.task_output = response.data
        },
        (error) => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        }
      )
      UserService.blenderSubtaskData(this.$route.params.id).then(
        (response) => {
          this.subtask_output = response.data
        },
        (error) => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        }
      )
    },
  },
}
</script>
