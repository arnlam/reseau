<template>
  <v-container fluid>
    <v-layout row>
        <SidebarLeft />
       <Poste />
       
    </v-layout>

     <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Nearby</span> 
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-container>
</template>


<script>
  import Poste from '@/components/Poste.vue';
  import SidebarLeft from '@/components/SidebarLeft.vue';

export default {
  name: 'home',
  components:{
    Poste,
    SidebarLeft
  },
  data () {
      return {
        bottomNav: 'recent'
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
