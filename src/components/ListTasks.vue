<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-20 sm:mt-4">
    <div class="md:grid md:grid-cols-8 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
        <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
          <button
            type="button"
            @click="createtask"
            class="inline-flex items-center mt-1 mb-2 px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-golemblue hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Create Task
          </button>
        </div>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="task in tasks" :key="task.unique_id">
              <a @click="taskredirect(task.unique_id)" class="block hover:bg-gray-50 cursor-pointer">
                <div class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-indigo-600 truncate">
                      Blender Task
                    </p>
                    <div class="ml-2 flex-shrink-0 flex">
                      <span
                        v-if="task.status == 'Not Started'"
                        class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
                        >{{ task.status }}
                      </span>
                      <span
                        v-if="task.status == 'Failed'"
                        class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
                        >{{ task.status }}
                      </span>
                      <span
                        v-else-if="task.status == 'Started'"
                        class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                      >
                        {{ task.status }}
                      </span>
                      <span
                        v-else-if="task.status == 'Finished'"
                        class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {{ task.status }}
                      </span>
                    </div>
                  </div>
                  <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                      <p class="flex items-center text-sm text-gray-500">
                        <ExternalLinkIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Click to view
                      </p>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <InformationCircleIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <p>
                        {{ task.unique_id }}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InformationCircleIcon, ExternalLinkIcon, PlusIcon } from "@heroicons/vue/solid"
import UserService from "../services/user.service"

export default {
  components: {
    InformationCircleIcon,
    ExternalLinkIcon,
    PlusIcon,
  },
  data() {
    return {
      tasks: [],
      content: "",
    }
  },
  mounted() {
    UserService.getTaskOverview().then(
      (response) => {
        this.tasks = response.data
      },
      (error) => {
        this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      }
    )
  },

  methods: {
    taskredirect(taskid) {
      this.$router.push({ name: "taskinfo", params: { id: taskid } })
    },
    createtask() {
      this.$router.push({ name: "blender" })
    },
  },
}
</script>
