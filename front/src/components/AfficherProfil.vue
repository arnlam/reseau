<template>

  <div id="profil">
    <v-jumbotron :gradient="gradient" dark src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Mon profil</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <ApolloMutation
    :mutation='require("../graphql/ModifierAuteur.gql")'
    :variables='{ id: userId, input: auteur }'
    @done="modifier">
      <template slot-scope="{mutate, loading, error}">
        <p v-if="error">Erreur lors de la sauvegarde : {{ error }}</p>
        <v-form>
          <v-container>
            <v-layout align-center justify-center>
              <v-flex xs12 sm6>
                <v-btn fab dark small absolute right color="cyan" @click.prevent="edit()">
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-text-field :disabled="!edition"
                v-model="auteur.prenom" label="Prénom" outline></v-text-field>
                <v-text-field :disabled="!edition"
                v-model="auteur.nom" label="Prénom" outline></v-text-field>
                <v-text-field :disabled="!edition"
                v-model="auteur.email" label="E-mail" outline></v-text-field>
                <v-text-field :disabled="!edition"
                v-model="auteur.ville" label="Ville" outline></v-text-field>
                <v-btn v-show="edition"
                @click.prevent="mutate()" color="success">
                  Valider les modifications
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </template>
    </ApolloMutation>
  </div>


</template>

<script>
export default {
  name: 'profil',
  props: {
    dataA: {
      type: Object,
    },
  },
  data() {
    return {
      auteur: {
        nom: this.dataA.nom,
        prenom: this.dataA.prenom,
        email: this.dataA.email,
        ville: this.dataA.ville,
      },
      edition: false,
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
    };
  },
  methods: {
    edit() {
      this.edition = !this.edition;
    },
    modifier() {
      this.$router.go();
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
</style>
