<template>
  <div>
    <p>
      <span v-show='!edit'>
        <svg
        @click="editerTexte()"
        id="i-msg" viewBox="0 0 32 32"
        width="32" height="32" fill="none"
        stroke="currentcolor" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="2">
        <path d="M2 4 L30 4 30 22 16 22 8 29 8 22 2 22 Z" />
        </svg>
      </span>
      <span v-show='edit'>
        <ul>
          <li v-for="com in commentaire"
          :key="com.id">
            {{com.texte}}

          </li>
          </ul>
      </span>
    </p>

      <!-- <ApolloMutation
      :mutation='require("../graphql/PosterCommentaire.gql")'
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
    </div>
  </template>

<script>

export default {
  props: {
    commentaire: {
      type: Array,
    },
  },
  data() {
    return {
      edit: false,
      // texte: this.commentaire.texte
    };
  },
  methods: {
    editerTexte() {
      this.edit = !this.edit;
    },
    modifier() {
      this.edit = !this.edit;
    },
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
.article {
 background: #ffff00;
 position: relative;
 width: 300px;
 padding: 10px;
 margin-top: 20px;
 margin-bottom: 20px;
 box-shadow: 6px 6px 0 0 grey;
 --borderWidth: 6px;
 border-radius: var(--borderWidth);
}
.article:hover {
 box-shadow: unset;
}
.article:hover:after {
 content: '';

 position: absolute;
 top: calc(-1 * var(--borderWidth));
 left: calc(-1 * var(--borderWidth));
 height: calc(100% + var(--borderWidth) * 2);
 width: calc(100% + var(--borderWidth) * 2);
 background: linear-gradient(
  60deg,
  #f79533,
  #f37055,
  #ef4e7b,
  #a166ab,
  #5073b8,
  #1098ad,
  #07b39b,
  #6fba82
 );
 border-radius: var(--borderWidth);
 z-index: -1;
 animation: animatedgradient 3s ease alternate infinite;
 background-size: 300% 300%;
}

@keyframes animatedgradient {
 0% {
  background-position: 0% 50%;
 }
 50% {
  background-position: 100% 50%;
 }
 100% {
  background-position: 0% 50%;
 }
}

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
