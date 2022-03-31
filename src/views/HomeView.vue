<template>
  <v-container>
    <PasswordGenerate />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import PasswordGenerate from '../components/PasswordGenerate.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    PasswordGenerate,
  },
});
</script>
