<template>
  <div>
    <b-card>
      <b-form v-on:submit.prevent="submitForm">
        <div>
          <h5>Blender File(s)</h5>
          <b-row>
            <b-col lg="6" md="6">
              <b-form-group id="input-group-1" label="Scene file" label-for="input-1">
                <b-form-file
                  v-model="form.scene_file"
                  :state="Boolean(form.scene_file)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3">Selected file: {{ form.scene_file ? form.scene_file.name : "" }}</div>
              </b-form-group>
            </b-col>
          </b-row>
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
                <b-form-input type="number" id="input-1" v-model="form.samples" placeholder="100" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <h5>Frame settings</h5>
          <b-row class="mt-2">
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Frames" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.frames" placeholder="0, 60, 2" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Output Format" label-for="input-1">
                <b-form-select
                  v-model="form.output"
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
                <b-form-input type="number" id="input-1" v-model="form.borderleft" placeholder="0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Right" label-for="input-1">
                <b-form-input id="input-1" v-model="form.borderright" placeholder="0" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Up" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="form.borderup" placeholder="0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Down" label-for="input-1">
                <b-form-input id="input-1" v-model="form.borderdown" placeholder="0" type="number"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4" md="6">
              <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group v-model="form.compositing" id="checkboxes-4" :aria-describedby="ariaDescribedby">
                  <b-checkbox value="me">Use Compositing?</b-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { item: "PNG", name: "PNG" },
        { item: "EXIF", name: "EXIF" },
      ],
      form: {
        resolutionx: null,
        resolutiony: null,
        scene_file: null,
        borderleft: null,
        borderright: null,
        borderup: null,
        borderdown: null,
        compositing: null,
        output: "PNG",
        frames: null,
        samples: null,
      },
    }
  },
  methods: {
    submitForm() {
      this.$api
        .post("/submit/blender", this.form)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error.response)
        })
        .finally(() => {
          //Perform action in always
        })
    },
  },
}
</script>
