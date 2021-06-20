<template>
  <div>
    <b-card>
      <b-form enctype="multipart/form-data" v-on:submit.prevent="submitForm">
        <div>
          <h5>Blender File(s)</h5>
          <b-row>
            <b-col lg="6" md="6">
              <b-form-group id="input-group-1" label="Scene file" label-for="input-1">
                <!-- <b-form-file
                  v-model="file"
                  v-on:change="handleFileUpload"
                  :state="Boolean(file)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file> -->
                <input type="file" id="file" ref="file" class="input is-rounded" v-on:change="handleFileUpload()" />

                <div class="mt-3">Selected file: {{ file ? file.name : "" }}</div>
              </b-form-group>
            </b-col>
          </b-row>
          <h5>Resolution</h5>
          <b-row>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Width" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="resolutionx" placeholder="1920" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Height" label-for="input-1">
                <b-form-input id="input-1" v-model="resolutiony" placeholder="1080" type="number" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Samples" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="samples" placeholder="100" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <h5>Frame settings</h5>
          <b-row class="mt-2">
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Frames" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="frames" placeholder="0, 60, 2" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Output Format" label-for="input-1">
                <b-form-select
                  v-model="output"
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
                <b-form-input type="number" id="input-1" v-model="borderleft" placeholder="0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Right" label-for="input-1">
                <b-form-input id="input-1" v-model="borderright" placeholder="0" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Up" label-for="input-1">
                <b-form-input type="number" id="input-1" v-model="borderup" placeholder="0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="2" md="6">
              <b-form-group id="input-group-1" label="Border Down" label-for="input-1">
                <b-form-input id="input-1" v-model="borderdown" placeholder="0" type="number"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4" md="6">
              <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group v-model="compositing" id="checkboxes-4" :aria-describedby="ariaDescribedby">
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
      this.$api
        .post("/submit/blender", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
  },
}
</script>
