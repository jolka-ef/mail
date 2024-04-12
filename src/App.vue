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
  <h1>Mail Inbox</h1>
  <Suspense>
    <template v-slot:default>
      <MailScreen />
    </template>
    <template v-slot:fallback> Loading.. </template>
  </Suspense>
</template>
