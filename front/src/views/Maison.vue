<template>
  <v-container fluid grid-list-xl >

        <SidebarLeft :auteur="auteur" />
        <v-layout>
       <Poste />
       <Chat v-if="chat" :chatId="chat"/>

        </v-layout>



  </v-container>
</template>


<script>
import Poste from '@/components/Poste.vue';
import SidebarLeft from '@/components/SidebarLeft.vue';
import Chat from '@/components/Chat.vue';


export default {
  name: 'home',
  components: {
    Poste,
    SidebarLeft,
    Chat
  },
  props: {
    auteur: { type: Object },
  },
  data() {
    return {
      bottomNav: 'recent',
      chat: ''
    };
  },
  created() {
    this.$root.$on('chat', (canalId) => {
    	this.chat = canalId;
    })
  }
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
