<template>
  <div class="home">
    <Poste/>
  </div>
</template>

<script>
// @ is an alias to /src
import Poste from '@/components/Poste.vue';

export default {
  name: 'home',
  components: {
    Poste,
  },
};
</script>
