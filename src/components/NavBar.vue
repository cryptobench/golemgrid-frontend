<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Popover open="true" class="relative bg-golemblue">
    <div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
      <div>
        <a href="/" class="flex">
          <span class="sr-only">GolemGrid</span>
          <img class="h-8 w-auto sm:h-10 ml-4" src="https://svgshare.com/i/YvJ.svg" alt="" />
        </a>
      </div>
      <div class="-mr-2 -my-2 md:hidden">
        <PopoverButton
          class="bg-white rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Open menu</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </PopoverButton>
      </div>
      <div class="hidden md:flex-1 md:flex md:items-center md:justify-between">
        <PopoverGroup as="nav" class="flex space-x-10">
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[open ? 'text-white' : 'text-white', 'group rounded-md inline-flex items-center text-base font-medium ']"
            >
              <span>Compute Engine</span>
              <ChevronDownIcon :class="[open ? 'text-white' : 'text-white', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    <a
                      v-for="item in resources"
                      :key="item.name"
                      :href="item.href"
                      class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                    >
                      <div
                        class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12"
                      >
                        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </PopoverGroup>
      </div>
      <div>
        <div v-if="authenticated" class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a @click="logOut" class="whitespace-nowrap text-base font-medium text-white hover:text-gray-400">Logout</a>
        </div>
        <div v-else class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <router-link class="whitespace-nowrap text-base font-medium text-white hover:text-gray-400" :to="{ name: 'Login' }"
            >Login</router-link
          >
          <router-link
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-700 hover:bg-indigo-700"
            :to="{ name: 'Register' }"
            >Sign up</router-link
          >
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel focus class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-6">
                <a
                  v-for="item in solutions"
                  :key="item.name"
                  :href="item.href"
                  class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                >
                  <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white">
                    <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div class="ml-4 text-base font-medium text-gray-900">
                    {{ item.name }}
                  </div>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/vue"

import { MenuIcon, XIcon, FireIcon } from "@heroicons/vue/outline"
import { ChevronDownIcon } from "@heroicons/vue/solid"

const resources = [
  {
    name: "Blender",
    description: "Render a Blender task",
    href: "/blender",
    icon: FireIcon,
  },
]

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    MenuIcon,
    XIcon,
  },
  watch: {
    $route() {
      this.authenticated = this.$store.state.auth.status.loggedIn
    },
  },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout")
      this.$router.push({ name: "Login" })
    },
  },
  setup() {
    return {
      resources,
    }
  },
  data() {
    return {
      latest_exchange: {},
      authenticated: this.$store.state.auth.status.loggedIn,
    }
  },
}
</script>
