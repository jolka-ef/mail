<script>
import MailScreen from './components/MailScreen.vue';
export default {
  name: 'App',
  components: {
    MailScreen,
  },
};
</script>
<template>
  <Suspense>
    <template v-slot:default>
      <MailScreen />
    </template>
    <template v-slot:fallback> Loading.. </template>
  </Suspense>
</template>
