<template>
  <div class="form-group">
    <label v-if="label">
      {{label}}
    </label>

    <vue-dropzone
      :ref="name" 
      :id="id" 
      :options="dropzoneOptions"
      :destroyDropzone="false"
      @vdropzone-success="vsuccess" 
      @vdropzone-removed-file="vremoved" 
      @vdropzone-mounted="vmounted">
    </vue-dropzone>
    
    <small class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</small>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";

export default {
  inject: ["$validator"],
  components: {
    vueDropzone: vue2Dropzone
  },
  name: "fg-dropzone",
  props: {
    label: String,
    name: String,
    value: {
      type: Array,
      default: []
    },
    id: String,
    url: String,
    maxFiles: {
      default: 8,
    },
    acceptedFiles: {
      default: "image/*,application/pdf"
    }
  },
  data() {
    return {
      visible: false,
      dropzoneOptions: {
        dictDefaultMessage: "Arraste seus arquivos aqui<br><small>ou clique para fazer o upload</small>",
        dictMaxFilesExceeded: "Você não pode adicionar mais arquivos",
        dictRemoveFile: "Remover",
        dictFileTooBig:
          "O arquivo é muito grande. Envie arquivos de até {{maxFilesize}}MB.",
        dictRemoveFileConfirmation: "Confirma a remoção do arquivo?",
        url: this.url,
        addRemoveLinks: true,
        acceptedFiles: this.acceptedFiles,
        thumbnailWidth: 150,
        maxFiles: this.maxFiles,
        maxFilesize: 2,
        headers: {
          "x-access-token": this.$store.state.token
        }
      }
    }
  },
  methods: {
    vremoved(file, error, xhr) {
      this.value.filter((arquivo, i) => {
        if (arquivo.name == file.name) {
          this.value.splice(i, 1);

          if(arquivo.id) {
            this.$emit('fileRemoved', arquivo.id);
          }
        }
      });
    },
    vsuccess(file, response) {
      this.value.push(response.result);
    },
    vmounted() {
      let app = this;

      this.value.forEach(function(file) {
        let url = file.path;

        let mocked = {
          size: file.size,
          name: file.name
        };

        let extension = url.split('.').pop();
        
        if((extension == 'png') || (extension == 'jpg') || (extension == 'jpeg')) {
          url = process.env.API_URL + url;
        } else {
          url = '';
        }

        app.$refs.myVueDropzone.manuallyAddFile(mocked, url);
      });
    },
  }
};
</script>
<style>

</style>
