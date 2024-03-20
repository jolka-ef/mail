<script>
import MailTable from './components/MailTable.vue';
export default {
  name: 'App',
  components: {
    MailTable,
  },
};
</script>
<template>
  <h1>Mail Inbox</h1>
  <Suspense>
    <template v-slot:default>
      <MailTable />
    </template>
    <template v-slot:fallback> Loading.. </template>
  </Suspense>
</template>
