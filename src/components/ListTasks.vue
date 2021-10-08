<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-20 sm:mt-4">
    <div class="md:grid md:grid-cols-8 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="task in tasks" :key="task.unique_id">
              <a @click="onWrapperClick(task.unique_id)" class="block hover:bg-gray-50 cursor-pointer">
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
                        v-else-if="task.status == 'started'"
                        class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                      >
                        {{ task.status }}
                      </span>
                      <span
                        v-else-if="task.status == 'finished'"
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
import { InformationCircleIcon, ExternalLinkIcon } from "@heroicons/vue/solid"

export default {
  components: {
    InformationCircleIcon,
    ExternalLinkIcon,
  },
  data() {
    return {
      tasks: [],
    }
  },
  created() {
    this.axios
      .get("tasks/all", {})
      .then((res) => {
        this.tasks = res.data
      })
      .catch((error) => {
        // error.response.status Check status code
        console.log(error.response)
      })
      .finally(() => {
        //Perform action in always
      })
  },
  methods: {
    onWrapperClick(taskid) {
      this.$router.push({ name: "taskinfo", params: { id: taskid } })
    },
  },
}
</script>
