<template>

     <v-layout justify-center>
    <v-flex xs12 sm8 md6>
        <h3>Poste !</h3>
        <ApolloMutation
        :mutation="require('../graphql/PosteMessage.gql')"
        :variables="{
          texte : texte,
          auteur: userId
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
          <button class='bouton' :disabled="loading || !texte" @click="mutate()">Envoyer</button>
          <p v-if="error">An error occured: {{ error }}</p>
        </template>
      </ApolloMutation>
      <Timeline 
      :tousLesArticles='{}' />
    </v-flex>
     </v-layout>


</template>


<script>
import Timeline from './Timeline.vue';

export default {
  components: {
    Timeline,
  },
  data() {
    return {
      texte: '',
      canal: 'general',
      edit: false,
    };
  },
  methods: {
    resizeTextarea() {
    },
    msgEnvoye() {
      console.log(this.userId)
      this.texte = '';
      this.$router.go();
    },
  },
  computed: {
      userId () {
        return this.$root.$data.userId
      }
    }
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

</style>
