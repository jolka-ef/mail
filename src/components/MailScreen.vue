<template>
  <div class="Container">
    <h1 class="Title">
      Mail {{ selectedScreen[0].toUpperCase() + selectedScreen.slice(1) }}
    </h1>

    <nav class="Navigation">
      <button
        @click="selectScreen('inbox')"
        :disabled="selectedScreen == 'inbox'"
      >
        <span>
          <Inbox />
          Inbox
        </span>
        <span>
          {{ inboxCount }}
        </span>
      </button>

      <button
        @click="selectScreen('starred')"
        :disabled="selectedScreen == 'starred'"
      >
        <span>
          <Star />
          Starred
        </span>
        <span>
          {{ starredCount }}
        </span>
      </button>

      <button
        @click="selectScreen('spam')"
        :disabled="selectedScreen == 'spam'"
      >
        <span>
          <Spam />
          Spam
        </span>
        <span>
          {{ spamCount }}
        </span>
      </button>

      <button
        @click="selectScreen('trash')"
        :disabled="selectedScreen == 'trash'"
      >
        <Trash />
        Trash
      </button>

      <button
        @click="selectScreen('archive')"
        :disabled="selectedScreen == 'archive'"
      >
        <Archive />
        Archived
      </button>
    </nav>

    <BulkActionBar :emails="filteredEmails" :screen="selectedScreen" />

    <MailTable :emails="filteredEmails" />
  </div>
</template>
<script>
import { ref } from 'vue';
import Archive from '../icons/Archive.vue';
import BulkActionBar from './BulkActionBar.vue';
import Inbox from '../icons/Inbox.vue';
import MailService from '@/services/MailService';
import MailTable from './MailTable.vue';
import Spam from '@/icons/Spam.vue';
import Star from '@/icons/Star.vue';
import Trash from '@/icons/Trash.vue';
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
    Archive,
    BulkActionBar,
    Inbox,
    MailTable,
    Spam,
    Star,
    Trash,
  },
  computed: {
    archivedEmails() {
      return this.sortedEmails.filter((email) => email.folder === 'archive');
    },
    inboxCount() {
      return this.inboxEmails.length;
    },
    inboxEmails() {
      return this.sortedEmails.filter((email) => email.folder === 'inbox');
    },

    sortedEmails() {
      return this.emails.sort((emailA, emailB) => {
        return emailA.sendDate < emailB.sendDate ? 100 : -1;
      });
    },
    spamCount() {
      return this.spamEmails.length;
    },
    spamEmails() {
      return this.sortedEmails.filter((email) => email.folder === 'spam');
    },
    starredCount() {
      return this.starredEmails.length;
    },
    starredEmails() {
      return this.sortedEmails.filter((email) => email.favorite);
    },

    trashEmails() {
      return this.sortedEmails.filter((email) => email.folder === 'trash');
    },

    filteredEmails() {
      let filters = {
        archive: this.archivedEmails,
        inbox: this.inboxEmails,
        spam: this.spamEmails,
        starred: this.starredEmails,
        trash: this.trashEmails,
      };
      return filters[this.selectedScreen];
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
