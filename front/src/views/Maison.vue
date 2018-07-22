<template>
  <v-container fluid>
    <v-layout row>
        <SidebarLeft />
       <Poste />
    </v-layout>
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
