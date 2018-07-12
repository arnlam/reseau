<template>


  <div id='poste'>
      <div>
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
          <button :disabled="loading" @click="mutate()">Envoyer</button>
          <p v-if="error">An error occured: {{ error }}</p>
        </template>
      </ApolloMutation>

      </div>
      <div>
        <ApolloQuery
        :query='require("../graphql/RecupereMessage.gql")'>
          <ApolloSubscribeToMore
          :document='require("../graphql/ArticleAjoute.gql")'
          :updateQuery='surArticleAjoute'
          :variables='{ canal }' />
          <template slot-scope='{result: {loading, error, data}}'>
            <div v-if='loading'> Loading...</div>
            <div v-else-if='error'>Une erreur</div>
            <div
            v-else-if='data'
            v-for='article of data.tousLesArticles.slice().reverse()'
            :key='article.id'
            class="article">
              <p><span v-show='!edit'>{{article.texte}}</span> </p>
              <ApolloMutation
              :mutation="require('../graphql/ModifierArticle.gql')"
              @done='msgModifie'>
                <template slot-scope="{mutate, loading, error}">
                  <textarea v-show="edit" :value="article.texte" />
                  <p v-if="error">An error occured: {{ error }}</p>
                </template>
              </ApolloMutation>
              <div class="options">
                <svg
                @click="editerTexte"
                id="i-edit" viewBox="0 0 32 32" width="24" height="24" fill="none"
                stroke="currentcolor" stroke-linecap="butt" stroke-linejoin="miter"
                stroke-width="1">
                    <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                </svg>
              </div>


            </div>
            <div v-else>Aucun résultat</div>
            <button>Voir plus</button>
          </template>
        </ApolloQuery>
      </div>
  </div>

</template>


<script>


export default {
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
    editerTexte() {
      this.edit = !this.edit;
    },
    msgEnvoye() {
      this.texte = '';
    },
    msgModifie() {},
    surArticleAjoute(previousResult, { subscriptionData }) {
      return {
        tousLesArticles: [
          ...previousResult.tousLesArticles,
          subscriptionData.data.articleAjoute,
        ],
      };
    },
  },
};
</script>

<style scoped>
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
  font-family: 'Roboto Mono';
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

button {
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
button:focus, input[type='button']::-moz-focus-inner{
  border:2px solid rgb(236, 187, 24);
  background: rgb(236, 187, 24);
  outline: none!important;
}
.article {
   background: rgb(236, 187, 24);
   position: relative;
   width: 300px;
   padding: 10px;
   margin-top: 20px;
   margin-bottom: 20px;
   box-shadow: 6px 6px 0 0 rgba(236, 187, 24, 0.4);
}
.dragging{
  background:  rgb(236, 24, 24);
}

.options{
  position:absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

</style>
