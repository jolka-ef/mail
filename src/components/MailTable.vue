<template>
  <ul class="MailList">
    <li
      v-for="email in emails"
      :key="email.id"
      :class="['clickable mail-item', email.read ? 'read' : '']"
      @mouseenter="isHovering = email.id"
      @mouseleave="isHovering = null"
    >
      <span>
        <input
          type="checkbox"
          @click="emailSelection.toggle(email)"
          :checked="emailSelection.emails.has(email)"
        />
      </span>
      <span>
        <input
          class="starMask"
          type="checkbox"
          @click="toggleFavorite(email)"
          :checked="email.favorite"
        />
      </span>
      <span class="email-sender" @click="openEmail(email)">
        {{ email.firstname }} {{ email.surname }}
      </span>
      <span class="email-subject" @click="openEmail(email)">
        <strong> {{ email.subject }} </strong>
      </span>

      <span class="email-details">
        <button
          class="email-button"
          v-show="isHovering == email.id"
          @click="toggleArchive(email)"
        >
          <Inbox v-if="email.folder === 'archive'" />
          <Archive v-else />
        </button>

        <button
          class="email-button"
          v-show="isHovering == email.id"
          @click="toggleRead(email)"
        >
          <OpenEnvelope v-if="email.read" />

          <CloseEnvelope v-else />
        </button>
        <span
          class="attachment"
          v-show="isHovering !== email.id"
          v-if="email.attachment"
        >
          <PaperClip />
        </span>
        <span v-show="isHovering !== email.id">
          {{ formatDate(email.sendDate) }}
        </span>
      </span>
    </li>
  </ul>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>
<script>
import { formatDate } from '@/utils/formatDate.js';
import { ref } from 'vue';
import Archive from '../icons/Archive.vue';
import BulkActionBar from './BulkActionBar.vue';
import CloseEnvelope from '../icons/CloseEnvelope.vue';
import Inbox from '../icons/Inbox.vue';
import MailService from '@/services/MailService';
import MailView from './MailView.vue';
import ModalView from './ModalView.vue';
import OpenEnvelope from '../icons/OpenEnvelope.vue';
import PaperClip from '../icons/PaperClip.vue';

import useEmailSelection from '../composables/use-email-selection.js';

export default {
  async setup() {
    return {
      emailSelection: useEmailSelection(),
      formatDate,
      isHovering: ref(null),
      openedEmail: ref(null),
    };
  },
  components: {
    Archive,
    BulkActionBar,
    CloseEnvelope,
    Inbox,
    MailView,
    ModalView,
    OpenEnvelope,
    PaperClip,
  },

  methods: {
    changeEmail({
      changeIndex,
      closeModal,
      save,
      toggleArchive,
      toggleFavorite,
      toggleRead,
    }) {
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
        const currentFolder = email.folder;
        email.folder = 'archive' === currentFolder ? 'inbox' : 'archive';
      }
      if (toggleFavorite) {
        email.favorite = !email.favorite;
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
    toggleArchive(email) {
      const currentFolder = email.folder;
      email.folder = 'archive' === currentFolder ? 'inbox' : 'archive';
      MailService.update(email);
    },
    toggleRead(email) {
      email.read = !email.read;
      MailService.update(email);
    },
    toggleFavorite(email) {
      email.favorite = !email.favorite;
      MailService.update(email);
    },
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
