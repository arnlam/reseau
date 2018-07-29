<template>


    <v-flex xs12 sm7 md5>
      <v-layout>
     <v-flex xs12 sm8>
        <ApolloMutation
        :mutation="require('../graphql/PosteMessage.gql')"
        :variables="{
          texte : texte,
          auteur: userId,
          uri: uri
        }"
        @done="msgEnvoye"
        >
        <template slot-scope="{ mutate, loading, error }">
          <v-textarea
          color="orange lighten-1"
          box
          auto-grow
          v-model="texte"
          placeholder="Ecrivez vot' message" />
          <v-btn block color="secondary"
          :disabled="loading || !texte" @click="mutate()">Envoyer</v-btn>
          <p v-if="error">An error occured: {{ error }}</p>
          <br /><br>
        </template>
      </ApolloMutation>
     </v-flex>
       <v-flex xs12 sm4>
       <Gallery :uploader="uploader" :key="keyUploader"/>
       </v-flex>
      </v-layout>
      <Timeline
      :tousLesArticles='{}' />

    </v-flex>

</template>


<script>
import Timeline from './Timeline.vue';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'vue-fineuploader/gallery'
// import '../assets/gallery.css'

export default {
  components: {
    Timeline,
    Gallery
  },
  data() {
     const uploader = new FineUploaderTraditional({
        options: {
          deleteFile: {
            enabled: true,
            endpoint: 'http://localhost:3000/uploads'
          },
          request: {
            endpoint: 'http://localhost:3000/uploads'
          },
          setItemLimit: 1,
          callbacks:{
            onComplete: (id, name, response) =>{
            this.uri = response.uri;        
            },
            onDelete: (id) =>{
            this.uri = '';
            },
          }
        }
      })
    return {
      texte: '',
      canal: 'general',
      edit: false,
      uploader,
      uri: '',
      keyUploader: 1
    };
  },
  methods: {
    resizeTextarea() {
    },
    msgEnvoye() {
      this.texte = '';
      this.keyUploader++;
    },
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
};
</script>

<style>
body{
  font-family: 'Roboto Mono';
}
/* #poste {
  text-align: center;
  margin: 60px;
  width: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
} */

/* textarea {
  border: 2px solid black;
  background: white;
  padding: 10px 15px;
  margin: 0 10px 20px;
  outline: 0;
  width: 60%;
  resize: none;
  cursor: pointer;
  box-shadow: 6px 6px 0 0 rgba(0,0,0,1);
} */

.bouton {
  font-family: 'Roboto Mono';
  border: 2px solid black;
  background: white;
  padding: 10px 15px;
  margin: 0 10px;
  outline: 0;
  width: 60%;
  cursor: pointer;
  outline: none!important;
  box-shadow: 6px 6px 0 0 rgba(0,0,0,1);
}
.bouton:focus, input[type='button']::-moz-focus-inner{
  border:2px solid rgb(236, 187, 24);
  background: #ffff00;
  outline: none!important;
}
  /* .vue-fine-uploader-file-input {
    display: inline-block;
   border: 2px solid black;
  }

  .vue-fine-uploader-file-input label {
    cursor: pointer;
  }

  .vue-fine-uploader-file-input input[type="file"] {
    width: 1px;
    height: 1px;
    opacity: 0;
  } */

</style>
