<template>
  <div class="home">
    <Table />
    <BlenderResults />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue"
import BlenderResults from "@/components/BlenderResults.vue"
export default {
  name: "Home",
  components: {
    Table,
    BlenderResults,
  },
}
</script>
