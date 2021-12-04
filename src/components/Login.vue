<template>
  <div>
    <div class="mt-20 sm:mt-4">
      <div class="md:grid md:grid-cols-8 md:gap-6">
        <div class="mt-5 md:mt-0 md:col-span-6 md:col-start-2 ">
          <form method="POST" enctype="multipart/form-data" @submit.prevent="handleLogin">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <!-- <div class="col-span-6 sm:col-span-2">
                    <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstname"
                      id="firstname"
                      v-model="firstname"
                      autocomplete="firstname"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-2">
                    <label for="username" class="block text-sm font-medium text-gray-700">lastname</label>
                    <input
                      required
                      type="text"
                      name="lastname"
                      id="lastname"
                      v-model="lastname"
                      autocomplete="lastname"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> -->
                  <div class="col-span-6 sm:col-span-2">
                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      required
                      type="text"
                      name="username"
                      id="username"
                      v-model="user.username"
                      autocomplete="username"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <!-- 
                  <div class="col-span-6 sm:col-span-2">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      v-model="email"
                      autocomplete="email"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> -->

                  <div class="col-span-6 sm:col-span-1">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      required
                      type="password"
                      name="password"
                      id="password"
                      v-model="user.password"
                      autocomplete="password"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <!-- <div class="col-span-6 sm:col-span-1">
                    <label for="password2" class="block text-sm font-medium text-gray-700">Password2</label>
                    <input
                      required
                      type="password2"
                      name="password2"
                      id="password2"
                      v-model="password2"
                      autocomplete="password2"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> -->
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
import { ref } from "vue"
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { CheckIcon } from "@heroicons/vue/outline"

export default {
  name: "Login",
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
      loading: false,
      message: "",
      user: {
        username: "",
        password: "",
      },
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/")
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/")
        },
        (error) => {
          this.loading = false
          this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        }
      )
    },
  },
}
</script>
