<template>

  <v-flex xs12 md3 lg2 hidden-sm-and-down>
    <v-card>


<!--
        <ApolloQuery :query='require("../graphql/RecupereProfil.gql")' :variables="{ id: userId }">
          <template slot-scope='{result: {loading, error, data}}'>
            <div v-if='loading'> Loading...</div>
            <div v-else-if='error'>Une erreur</div>
            <div v-else-if='data'> -->

              <v-list>
                <v-list-tile @click="voirProfil()">


                <v-list-tile-avatar>
                  <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg" />
                </v-list-tile-avatar>
                  <v-list-tile-content>
                  <v-list-tile-title>
                  {{auteur.prenom}} {{auteur.nom}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{auteur.ville}}</v-list-tile-sub-title>
                  </v-list-tile-content>


                </v-list-tile>
                  <v-divider></v-divider>
                <v-list-group>
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title>Ami</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile v-for="(ami, index) in auteur.amis" :key="'ami'+index" @click="">
                    <v-list-tile-content>
                      <v-list-tile-title>  <router-link :to="{ path:`/membre/${ami.id}` }">{{ami.personne.prenom}} {{ami.personne.nom}}</router-link></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon>person</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
              </v-list>

            <!-- </div>
            <div v-else>Aucun résultat</div>
          </template>
        </ApolloQuery> -->
    </v-card>
  </v-flex>

</template>
<script>
export default {
  name: 'SidebarLeft',
  props: {
    auteur: { type: Object },
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
  methods: {
    voirProfil() {
      this.$router.replace(`/membre/${this.userId}`);
    },
  },
  data() {
    return {
      items: [{
        action: 'people',
        title: 'Amis',
        items: [{
          title: 'List Item',
        }],
      },
      {
        action: 'restaurant',
        title: 'Autre',
        active: true,
        items: [{
          title: '1',
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        ],
      },
      ],
    };
  },
};
</script>
