<template>


  <div id='poste'>
        <h3>Poste !</h3>
        <ApolloMutation
        :mutation="require('../graphql/PosteMessage.gql')"
        :variables="{
          texte
        }"
        @done="msgEnvoye"
        >
        <template slot-scope="{ mutate, loading, error }">
          <textarea
          v-model="texte"
          placeholder="Ecrivez vot' message" />
          <button class='bouton' :disabled="loading" @click="mutate()">Envoyer</button>
          <p v-if="error">An error occured: {{ error }}</p>
        </template>
      </ApolloMutation>
      <Article
      :tousLesArticles='{}' />
  </div>

</template>


<script>
import Article from './Article.vue';

export default {
  components: {
    Article,
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
      this.texte = '';
    },
  },
};
</script>

<style>
body{
  font-family: 'Roboto Mono';
}
#poste {
  text-align: center;
  margin: 60px;
  width: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

textarea {
  border: 2px solid black;
  background: white;
  padding: 10px 15px;
  margin: 0 10px 20px;
  outline: 0;
  width: 60%;
  resize: none;
  cursor: pointer;
  box-shadow: 6px 6px 0 0 rgba(0,0,0,1);
}

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
