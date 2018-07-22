<template>
  <div>
    <p><span v-show='!edit'>{{this.variables.texte}}</span> </p>
      <ApolloMutation
      :mutation='require("../graphql/ModifierArticle.gql")'
      :variables='{ input:{ texte:texte }, id:this.variables.id }'
      @done="modifier"
      >
        <template slot-scope="{mutate, loading, error}">
          <textarea v-show="edit" v-model="texte" />
          <p v-if="error">Erreur lors de la sauvegarde: {{ error }}</p>
          <button class="bouton" v-show="edit" @click="mutate()">Modifier</button>
        </template>
      </ApolloMutation>
        <div class="options">
          <svg
          @click="editerTexte()"
          id="i-edit" viewBox="0 0 32 32" width="24" height="24" fill="none"
          stroke="currentcolor" stroke-linecap="butt" stroke-linejoin="miter"
          stroke-width="1">
              <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
          </svg>
      </div>
    </div>
  </template>

<script>

export default {
  props: {
    variables: {
      type: Object,
    },
  },
  data() {
    return {
      edit: false,
      texte: this.variables.texte,
    };
  },
  methods: {
    editerTexte() {
      this.edit = !this.edit;
    },
    modifier() {
      this.edit = !this.edit;
    },
  },
};

</script>


<style scoped>


svg:hover {
 stroke: lightpink;
 fill: black;
}
.options {
 position: absolute;
 top: 5px;
 right: 5px;
 cursor: pointer;
}
</style>
