<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-xl font-bold text-gray-900">Output</h2>

      <div class="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8">
        <div v-for="result in images" :key="result">
          <div class="relative">
            <div class="relative w-full rounded-lg overflow-hidden">
              <img :src="'http://static.localhost' + result.file" class="w-full h-full object-center object-cover" />
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
</template>

<script>
import UserService from "../services/user.service"
const products = [
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt: "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  // More products...
]

export default {
  setup() {
    return {
      products,
    }
  },
  data() {
    return {
      images: {},
    }
  },
  created() {
    this.interval = setInterval(() => this.subtask_result(), 10000)
  },
  methods: {
    subtask_result() {
      UserService.blenderSubtaskResults(this.$route.params.id).then(
        (response) => {
          this.images = response.data
          for (var test in this.images) {
            console.log(test[0])
          }
        },
        (error) => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        }
      )
    },
  },
}
</script>
