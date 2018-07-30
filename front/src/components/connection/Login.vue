<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6>
        <div class="d-flex align-center">
          <v-btn @click="loginCard">S'identifier</v-btn>
          <v-btn @click="registerCard">S'enregistrer</v-btn>
        </div>
        <v-card v-show="loginSelect === 'login'">
          <v-toolbar dark color="primary ">
            <v-toolbar-title>S'identifier</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="identifiant" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
              <v-text-field @keyup.native.enter="confirm()" v-model="motDePasse" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="confirm()">Entrer</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-show="loginSelect === 'register'">
          <v-toolbar dark color="primary ">
            <v-toolbar-title>S'enregistrer</v-toolbar-title>

          </v-toolbar>
            <ApolloMutation
              :mutation="require('../../graphql/CreerAuteur.gql')"
              :variables="{
                      input: inputRegister
                    }"
              @done="confirmation = true; loginSelect = ''">
              <template slot-scope="{ mutate, loading, error }">
          <v-card-text>
                <v-form>
                  <v-text-field v-model="inputRegister.prenom" prepend-icon="person" name="prénom" label="Prénom" type="text"></v-text-field>
                  <v-text-field v-model="inputRegister.nom" prepend-icon="person" name="nom" label="Nom" type="text"></v-text-field>
                  <v-text-field v-model="inputRegister.login" prepend-icon="person" name="login" label="Pseudo" type="text"></v-text-field>
                  <v-text-field v-model="inputRegister.password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                  <v-text-field v-model="inputRegister.email" id="email" prepend-icon="email" name="email" label="email" type="email"></v-text-field>
                  <p v-if="error">Votre login ou votre email est déjà enregistré</p>
                </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="loading" @click="mutate()">Envoyer</v-btn>
          </v-card-actions>
              </template>
            </ApolloMutation>
        </v-card>
          <v-card v-if="confirmation">
          <v-toolbar dark color="primary ">
            <v-toolbar-title>Enregistrement confirmé</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <p>
            Votre demande d'enregistrement a été prise en compte. Un email vous a été envoyé.
            Vous pouvez vous connecter.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginSelect: 'login',
      inputRegister: {
        login: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
      },
      identifiant: '',
      motDePasse: '',
      confirmation: false,
    };
  },
  methods: {
    loginCard() {
      console.log(this.loginSelect);
      this.loginSelect = 'login';
      if (this.confirmation === true) { this.confirmation = false; }
    },
    registerCard() {
      this.loginSelect = 'register';
      if (this.confirmation === true) { this.confirmation = false; }
    },
    confirm() {
      if (this.identifiant && this.motDePasse) {
        console.log(this.identifiant);
        console.log(this.motDePasse);
        this.$apollo.mutate({
          mutation: require('../../graphql/verifLogin.gql'),
          variables: { login: this.identifiant, password: this.motDePasse },
        }).then((result) => {
          const id = result.data.verifLogin.id;
          const token = result.data.verifLogin.token;
          this.saveUserData(id, token);
          this.$router.replace('/mur/accueil');
        }).catch((error) => {
          alert(error);
        });
      }
    },
    saveUserData(id, token) {
      localStorage.setItem('user-id', id);
      localStorage.setItem('auth-token', token);
      this.$root.$data.userId = localStorage.getItem('user-id');
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
