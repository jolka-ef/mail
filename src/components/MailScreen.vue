<template>
  <h1>Mail {{ selectedScreen[0].toUpperCase() + selectedScreen.slice(1) }}</h1>

  <nav>
    <button
      @click="selectScreen('inbox')"
      :disabled="selectedScreen == 'inbox'"
    >
      Inbox
    </button>

    <button
      @click="selectScreen('starred')"
      :disabled="selectedScreen == 'starred'"
    >
      Starred
    </button>

    <button @click="selectScreen('spam')" :disabled="selectedScreen == 'spam'">
      Spam
    </button>

    <button
      @click="selectScreen('trash')"
      :disabled="selectedScreen == 'trash'"
    >
      Trash
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
      if (this.selectedScreen == 'trash') {
        return this.sortedEmails.filter((email) => email.folder === 'trash');
      } else if (this.selectedScreen == 'spam') {
        return this.sortedEmails.filter((email) => email.folder === 'spam');
      } else if (this.selectedScreen == 'starred') {
        return this.sortedEmails.filter((email) => email.favorite);
      } else if (this.selectedScreen == 'inbox') {
        return this.sortedEmails.filter((email) => email.folder === 'inbox');
      } else if (this.selectedScreen == 'archive') {
        return this.sortedEmails.filter((email) => email.folder === 'archive');
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
