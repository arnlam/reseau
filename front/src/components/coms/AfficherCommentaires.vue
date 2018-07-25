<template>
  <div>
     <ul
      class="liste-commentaires"
      v-show='edit' >
      <span @click='editerTexte()'>
        Masquer les commentaires
      </span>
      <li v-for="com in commentaires"
      :key="com.id">
        {{com.texte}}
      </li>
    </ul>
    <!-- <ModifierCommentaires
      :commentaires="commentaires"
      v-show='edit'
      @click='editerTexte()'
    /> -->
     <ApolloMutation
      :mutation='require("../../graphql/PosterCommentaire.gql")'
      :variables='{ input:{ articleId: this.articleId, texte : texte } }'
      @done="modifier"
      v-show='edit'
      >
      <template slot-scope="{mutate, loading, error}">
        <textarea v-model="texte" />
        <p v-if="error">An error occured: {{ error }}</p>
        <button class="bouton" @click="mutate()">Modifier</button>
      </template>
    </ApolloMutation>
    <div class="icone-commentaires" v-show='!edit'>
      <svg
      @click="editerTexte()"
      id="i-msg" viewBox="0 0 32 32"
      width="32" height="32" fill="none"
      stroke="currentcolor" stroke-linecap="round"
      stroke-linejoin="round" stroke-width="2">
        <path d="M2 4 L30 4 30 22 16 22 8 29 8 22 2 22 Z" />
      </svg>
      <div class='nombre-commentaires'
      v-if="commentaires.length">
        {{commentaires.length}}
      </div>
    </div>


    </div>
  </template>

<script>

export default {

  props: {
    commentaires: {
      type: Array,
    },
    articleId: {
      type: String,
    },
  },
  data() {
    return {
      texte: '',
      edit: false,
    };
  },
  methods: {
    editerTexte() {
      this.edit = !this.edit;
    },
    modifier() {
      this.texte = '';
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
.nombre-commentaires{
  position: absolute;
  top:-20%;
  right: 0;
  border-radius: 50%;
  width: 20px;
  background-color: #a166ab;
  text-align: center;
  color: white;
}
.icone-commentaires{
  position: relative;
  text-align: right;
}
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
