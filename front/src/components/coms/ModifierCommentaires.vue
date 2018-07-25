<template>
  <ApolloMutation
    :mutation='require("../../graphql/PosterCommentaire.gql")'
    :variables='{ input:{ articleId:com.articleId, texte : texte } }'
    @done="modifier"
    >
    <template slot-scope="{mutate, loading, error}">
      <textarea v-model="texte" />
      <p v-if="error">An error occured: {{ error }}</p>
      <button class="bouton" @click="mutate()">Modifier</button>
    </template>
  </ApolloMutation>
</template>
    <!-- <ApolloMutation
    :mutation='require("../../graphql/PosterCommentaire.gql")'
    :variables='{ input:{ texte:texte }, id:this.variables.id }'
    @done="modifier"
    >
      <template slot-scope="{mutate, loading, error}">
        <textarea v-show="edit" v-model="texte" />
        <p v-if="error">An error occured: {{ error }}</p>
        <button class="bouton" v-show="edit" @click="mutate()">Modifier</button>
      </template>
    </ApolloMutation> -->
      <!-- <div class="options">
        <svg
        @click="editerTexte()"
        id="i-edit" viewBox="0 0 32 32" width="24" height="24" fill="none"
        stroke="currentcolor" stroke-linecap="butt" stroke-linejoin="miter"
        stroke-width="1">
            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
        </svg>
    </div> -->
<script>

export default {
  props: {
    commentaires: {
      type: Array,
    },
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    modifier() {
      vm.$emit('editerTexte');
    },
  },
};
</script>
<style scoped>
.liste-commentaires{
  text-align: left;
  padding-top: 1rem;
  border-top: solid 2px gray;
  list-style:none;
}
.liste-commentaires li{
  padding: 1rem;
  border-bottom: solid 1px gray;
}
</style>

