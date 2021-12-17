<template>
  <div>
    <div class="mt-20 sm:mt-4">
      <div class="md:grid md:grid-cols-8 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
          <form enctype="multipart/form-data" v-on:submit.prevent="submitForm">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700">
                      Scene file
                    </label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div v-if="file" class="mt-3"><b>Selected file:</b> {{ file ? file.name : "" }}</div>
                      <div v-else class="space-y-1 text-center">
                        <svg
                          class="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label
                            for="file"
                            class="relative cursor-pointer bg-white rounded-md font-medium text-golemblue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input required id="file" ref="file" name="file" type="file" v-on:change="handleFileUpload()" class="sr-only" />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-6">
                <div class="px-4 py-3 bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    class="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-golemblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div>
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Submitting task and spawning container
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      You will be redirected very shortly.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Close
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import api from "@/services/api"
import { ref } from "vue"
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { CheckIcon } from "@heroicons/vue/outline"
export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckIcon,
  },
  setup() {
    const open = ref(false)

    return {
      open,
    }
  },
  data() {
    return {
      file: "",
    }
  },
  methods: {
    submitForm() {
      this.open = !this.open
      let data = new FormData() // creates a new FormData object
      data.append("scene_file", this.file) // add your file to form data
      api
        .post("v1/submit/blender", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$router.push({ name: "taskinfo", params: { id: res.data.task_id } })
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error.response)
        })
        .finally(() => {
          //Perform action in always
        })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
  },
}
</script>
