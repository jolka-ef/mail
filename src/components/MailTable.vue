<template>
  <button @click="selectScreen('inbox')" :disabled="selectedScreen == 'inbox'">
    Inbox
  </button>
  <button
    @click="selectScreen('archive')"
    :disabled="selectedScreen == 'archive'"
  >
    Archived
  </button>
  <BulkActionBar :emails="filteredEmails" />
  <table class="mail-table">
    <thead>
      <tr>
        <th scope="col" class="sr-only">Checkbox</th>
        <th scope="col" class="sr-only">From</th>
        <th scope="col" class="sr-only">Email sybject</th>
        <th scope="col" class="sr-only">Sent at</th>
      </tr>
    </thead>
    <tr
      v-for="email in filteredEmails"
      :key="email.id"
      :class="['clickable', email.read ? 'read' : '']"
    >
      <td>
        <input
          type="checkbox"
          @click="emailSelection.toggle(email)"
          :checked="emailSelection.emails.has(email)"
        />
      </td>
      <td @click="openEmail(email)">{{ email.from }}</td>
      <td @click="openEmail(email)">
        <strong> {{ email.subject }} </strong>
      </td>
      <td class="date" @click="openEmail(email)">
        {{ formatDate(email.sentAt) }}
      </td>
    </tr>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>
<script>
import { formatDate } from '@/utils/formatDate.js';
import MailService from '@/services/MailService';
import { ref } from 'vue';
import BulkActionBar from './BulkActionBar.vue';
import MailView from './MailView.vue';
import ModalView from './ModalView.vue';
import useEmailSelection from '../composables/use-email-selection.js';

export default {
  async setup() {
    let { data: emails } = await MailService.getEmails();

    return {
      emailSelection: useEmailSelection(),
      emails: ref(emails),
      formatDate,
      openedEmail: ref(null),
      selectedScreen: ref('inbox'),
    };
  },
  components: {
    BulkActionBar,
    MailView,
    ModalView,
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((emailA, emailB) => {
        return emailA.sentAt < emailB.sentAt ? 100 : -1;
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
    changeEmail({ changeIndex, closeModal, save, toggleArchive, toggleRead }) {
      let email = this.openedEmail;

      if (changeIndex) {
        let emails = this.filteredEmails;
        let currentIndex = emails.indexOf(email);
        const newEmail = emails[currentIndex + changeIndex];
        console.log(newEmail);
        this.openEmail(newEmail);
      }
      if (closeModal) {
        this.openedEmail = null;
      }
      if (save) {
        MailService.update(email);
      }

      if (toggleArchive) {
        email.archived = !email.archived;
      }
      if (toggleRead) {
        email.read = !email.read;
      }
    },
    openEmail(email) {
      this.openedEmail = email;

      if (email) {
        email.read = true;
        MailService.update(email);
      }
    },
    selectScreen(newScreen) {
      this.selectedScreen = newScreen;
      this.emailSelection.clear();
    },
  },
};
</script>

<style scoped></style>
