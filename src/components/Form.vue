<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
      <div class="lg:max-w-lg">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-golemblue sm:text-4xl">Render a blender task</h1>
        </div>

        <section aria-labelledby="information-heading" class="mt-4">
          <h2 id="information-heading" class="sr-only">Product information</h2>

          <div class="mt-4 space-y-6">
            <p class="text-base text-gray-500">
              Render your scenes with ease on GolemGrid. Just submit a .blend file with your settings prebaked into the file.

              <br /><br />
              Please note that using steps in your frames are <b>not</b> supported.
            </p>
          </div>

          <RadioGroup class="mt-8" v-model="selected">
            <RadioGroupLabel class="sr-only">
              Server size
            </RadioGroupLabel>
            <div class="space-y-4">
              <RadioGroupOption as="template" v-for="plan in plans" :key="plan.name" :value="plan" v-slot="{ checked, active }">
                <div
                  :class="[
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none',
                  ]"
                >
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel as="p" class="font-medium text-gray-900">
                        {{ plan.name }}
                      </RadioGroupLabel>
                      <RadioGroupDescription as="div" class="text-gray-500">
                        <p class="sm:inline">{{ plan.cpus }}</p>
                        <span class="hidden sm:inline sm:mx-1" aria-hidden="true">&middot;</span>
                        <p class="sm:inline">{{ plan.ram }} RAM</p>
                        {{ " " }}
                        <span class="hidden sm:inline sm:mx-1" aria-hidden="true">&middot;</span>
                        {{ " " }}
                        <p class="sm:inline">{{ plan.disk }}</p>
                      </RadioGroupDescription>
                    </div>
                  </div>
                  <RadioGroupDescription as="div" class="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                    <div class="font-medium text-gray-900">{{ plan.price }}</div>
                    <div class="ml-1 text-gray-500 sm:ml-0">/10 node</div>
                  </RadioGroupDescription>
                  <div
                    :class="[
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'absolute -inset-px rounded-lg pointer-events-none',
                    ]"
                    aria-hidden="true"
                  />
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </section>
      </div>

      <div class="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <form enctype="multipart/form-data" v-on:submit.prevent="submitForm">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5  sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700">
                      Scene file
                    </label>
                    <div class="mt-1 flex justify-center px-6 pt-36 pb-36 border-2 border-gray-300 border-dashed rounded-md">
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
                            class="relative cursor-pointer  rounded-md font-medium text-golemblue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input required id="file" ref="file" name="file" type="file" v-on:change="handleFileUpload()" class="sr-only" />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          .blend files only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-6 sm:col-span-6">
                <div class="px-4 py-3 sm:px-6">
                  <button
                    type="submit"
                    class="w-full bg-golemblue border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Upload Scene
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
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue"

import { CheckIcon } from "@heroicons/vue/outline"
const plans = [
  { name: "Hobby", ram: "4GB", cpus: "4 Cores", disk: "160 GB Storage", price: "$1" },
  { name: "Startup", ram: "8GB", cpus: "10 Cores", disk: "256 GB SSD disk", price: "$2" },
  { name: "Business", ram: "16GB", cpus: "48 Cores", disk: "512 GB SSD disk", price: "$6" },
  { name: "Enterprise", ram: "32GB", cpus: "64 Cores", disk: "1024 GB SSD disk", price: "$10" },
]
export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    CheckIcon,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },

  setup() {
    const open = ref(false)
    const selected = ref(plans[0])

    return {
      open,
      plans,
      selected,
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
