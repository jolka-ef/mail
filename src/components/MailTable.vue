<template>
  <table class="mail-table">
    <thead>
      <tr>
        <th scope="col" class="sr-only">Checkbox</th>
        <th scope="col" class="sr-only">From</th>
        <th scope="col" class="sr-only">Email content</th>
        <th scope="col" class="sr-only">Sent at</th>
        <th scope="col" class="sr-only">Archive</th>
      </tr>
    </thead>
    <tr
      v-for="email in unarchivedEmails"
      :key="email.id"
      :class="['clickable', email.read ? 'read' : '']"
      @click="openEmail(email)"
    >
      <td><input type="checkbox" /></td>
      <td>{{ email.from }}</td>
      <td class="mail-content">
        <strong> {{ email.subject }} </strong> - {{ email.body }}
      </td>
      <td class="date">
        {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
      </td>
      <td><button @click="archiveEmail(email)">Archive</button></td>
    </tr>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>
<script>
import axios from 'axios';
import { format } from 'date-fns';
import { ref } from 'vue';
import MailView from './MailView.vue';
import ModalView from './ModalView.vue';

export default {
  async setup() {
    let { data: emails } = await axios.get('http://localhost:3000/emails');
    return { emails: ref(emails), format, openedEmail: ref(null) };
  },
  components: {
    MailView,
    ModalView,
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((emailA, emailB) => {
        return emailA.sentAt < emailB.sentAt ? 100 : -1;
      });
    },
    unarchivedEmails() {
      return this.sortedEmails.filter((email) => !email.archived);
    },
  },
  methods: {
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    changeEmail({ changeIndex, closeModal, save, toggleArchive, toggleRead }) {
      let email = this.openedEmail;

      if (changeIndex) {
        let emails = this.unarchivedEmails;
        let currentIndex = emails.indexOf(email);
        const newEmail = emails[currentIndex + changeIndex];
        console.log(newEmail);
        this.openEmail(newEmail);
      }
      if (closeModal) {
        this.openedEmail = null;
      }
      if (save) {
        this.updateEmail(email);
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
        this.updateEmail(email);
      }
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    },
  },
};
</script>

<style scoped></style>
