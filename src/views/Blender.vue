<template>
  <div>
    <b-card>
      <b-form @submit="onSubmit" @reset="onReset">
        <div>
          <h5>Resolution</h5>
          <b-row>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Width" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.resolutionx" placeholder="1920" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Height" label-for="input-1">
                <b-form-input id="input-1" v-model="form.resolutiony" placeholder="1080" type="number" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Samples" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.resolutionx" placeholder="100" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <h5>Frame settings</h5>
          <b-row class="mt-2">
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Frames" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.resolutionx" placeholder="0, 60, 2" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Output Format" label-for="input-1">
                <b-form-select
                  v-model="selected"
                  :options="options"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <h5>Crops</h5>
          <b-row>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Left" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.resolutionx" placeholder="0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Right" label-for="input-1">
                <b-form-input id="input-1" v-model="form.resolutiony" placeholder="0" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Up" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.resolutionx" placeholder="0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Down" label-for="input-1">
                <b-form-input id="input-1" v-model="form.resolutiony" placeholder="0" type="number"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4" md="6">
              <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group v-model="form.checked" id="checkboxes-4" :aria-describedby="ariaDescribedby">
                  <b-checkbox value="me">Use Compositing?</b-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "PNG",
      options: [
        { item: "PNG", name: "PNG" },
        { item: "EXIF", name: "EXIF" },
      ],
      form: {
        resolutionx: null,
        resolutiony: null,
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ""
      this.form.name = ""
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
