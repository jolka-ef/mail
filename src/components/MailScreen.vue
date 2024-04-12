<template>
  <nav>
    <button
      @click="selectScreen('inbox')"
      :disabled="selectedScreen == 'inbox'"
    >
      Inbox
    </button>
    <button
      @click="selectScreen('archive')"
      :disabled="selectedScreen == 'archive'"
    >
      Archived
    </button>
  </nav>
  <MailTable :emails="filteredEmails" />
</template>
<script>
import { ref } from 'vue';
import MailService from '@/services/MailService';
import MailTable from './MailTable.vue';

import useEmailSelection from '../composables/use-email-selection.js';

export default {
  async setup() {
    let { data: emails } = await MailService.getEmails();
    return {
      emailSelection: useEmailSelection(),
      emails: ref(emails),

      selectedScreen: ref('inbox'),
    };
  },
  components: {
    MailTable,
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((emailA, emailB) => {
        return emailA.sendDate < emailB.sendDate ? 100 : -1;
      });
    },
    filteredEmails() {
      if (this.selectedScreen == 'inbox') {
        return this.sortedEmails.filter((email) => !email.archived);
      } else {
        return this.sortedEmails.filter((email) => email.archived);
      }
    },
  },
  methods: {
    selectScreen(newScreen) {
      this.selectedScreen = newScreen;
      this.emailSelection.clear();
    },
  },
};
</script>
