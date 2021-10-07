<template>
  <div>
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-2">
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
                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file" ref="file" name="file" type="file" v-on:change="handleFileUpload()" class="sr-only" />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label for="resolution_width" class="block text-sm font-medium text-gray-700">Resolution Width</label>
                    <input
                      type="number"
                      name="resolution_width"
                      id="resolution_width"
                      v-model="resolutionx"
                      autocomplete="resolution_width"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <label for="resolution_height" class="block text-sm font-medium text-gray-700">Resolution Height</label>
                    <input
                      type="number"
                      name="resolution_height"
                      id="resolution_height"
                      v-model="resolutiony"
                      autocomplete="resolution_height"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-1">
                    <label for="samples" class="block text-sm font-medium text-gray-700">Samples</label>
                    <input
                      type="number"
                      name="samples"
                      id="samples"
                      v-model="samples"
                      autocomplete="samples"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-1">
                    <label for="frames" class="block text-sm font-medium text-gray-700">Frames</label>
                    <input
                      type="number"
                      name="frames"
                      id="frames"
                      v-model="frames"
                      autocomplete="frames"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-1">
                    <label for="format" class="block text-sm font-medium text-gray-700">Output Format</label>
                    <select
                      id="format"
                      name="format"
                      autocomplete="format"
                      v-model="output"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>PNG</option>
                      <option>EXIF</option>
                    </select>
                  </div>
                  <div class="col-span-6 sm:col-span-6"></div>
                  <div class="col-span-6 sm:col-span-1">
                    <label for="borderleft" class="block text-sm font-medium text-gray-700">Border left</label>
                    <input
                      type="number"
                      name="borderleft"
                      id="borderleft"
                      v-model="borderleft"
                      autocomplete="borderleft"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-1">
                    <label for="borderright" class="block text-sm font-medium text-gray-700">Border right</label>
                    <input
                      type="number"
                      name="borderright"
                      id="borderright"
                      v-model="borderright"
                      autocomplete="borderright"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-1">
                    <label for="borderup" class="block text-sm font-medium text-gray-700">Border up</label>
                    <input
                      type="number"
                      name="borderup"
                      id="borderup"
                      v-model="borderup"
                      autocomplete="borderup"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-1">
                    <label for="borderdown" class="block text-sm font-medium text-gray-700">Border down</label>
                    <input
                      v-model="borderdown"
                      type="number"
                      name="borderdown"
                      id="borderdown"
                      autocomplete="borderdown"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-6">
                <div class="px-4 py-3 bg-gray-50 sm:px-6">
                  <button
                    @click="open = !open"
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
import axios from "axios"
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
      options: [
        { item: "PNG", name: "PNG" },
        { item: "EXIF", name: "EXIF" },
      ],
      file: "",
      resolutionx: 200,
      resolutiony: 200,
      borderleft: 0,
      borderright: 0,
      borderup: 0,
      borderdown: 0,
      compositing: false,
      output: "PNG",
      frames: 1,
      samples: 100,
    }
  },
  methods: {
    submitForm() {
      let data = new FormData() // creates a new FormData object
      data.append("resolutionx", this.resolutionx) // add your file to form data
      data.append("resolutiony", this.resolutiony) // add your file to form data
      data.append("scene_file", this.file) // add your file to form data
      data.append("borderleft", this.borderleft) // add your file to form data
      data.append("borderright", this.borderright) // add your file to form data
      data.append("borderup", this.borderup) // add your file to form data
      data.append("borderdown", this.borderdown) // add your file to form data
      data.append("compositing", this.compositing) // add your file to form data
      data.append("output", this.output) // add your file to form data
      data.append("frames", this.frames) // add your file to form data
      data.append("samples", this.samples) // add your file to form data
      console.log(">> formData >> ", data)
      axios
        .post("https://api.staging.golemgrid.com/v1/submit/blender", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.task_id)
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
