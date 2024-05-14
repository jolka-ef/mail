<template>
  <ul class="MailList">
    <li
      v-for="email in emails"
      :key="email.id"
      :class="['MailList-item', email.read ? 'read' : '']"
      @mouseenter="isHovering = email.id"
      @mouseleave="isHovering = null"
    >
      <input
        class="MailPreview-checkbox"
        type="checkbox"
        @click="emailSelection.toggle(email)"
        :checked="emailSelection.emails.has(email)"
      />
      <input
        class="MailPreview-star"
        type="checkbox"
        @click="toggleFavorite(email)"
        :checked="email.favorite"
      />
      <span class="MailPreview-sender" @click="openEmail(email)">
        {{ email.firstname }} {{ email.surname }}
      </span>
      <span class="MailPreview-title" @click="openEmail(email)">
        {{ email.subject }}
      </span>

      <span class="MailPreview-details">
        <button
          v-show="isHovering == email.id"
          class="MailPreview-button"
          @click="toggleArchive(email)"
        >
          <Inbox v-if="email.folder === 'archive'" />
          <Archive v-else />
        </button>

        <button
          v-show="isHovering == email.id"
          class="MailPreview-button"
          @click="toggleRead(email)"
        >
          <OpenEnvelope v-if="email.read" />

          <CloseEnvelope v-else />
        </button>

        <PaperClip
          class="MailPreview-attachment"
          v-show="isHovering !== email.id"
          v-if="email.attachment"
        />
        <span class="MailPreview-date" v-show="isHovering !== email.id">
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

<style scoped>
.MailList {
  grid-area: mailList;
  padding: 0;
  background: var(--color-background);
}
.MailList-item {
  border-bottom: var(--line);
  cursor: pointer;
  font-weight: bold;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr auto 2.5em;
  grid-template-areas:
    'checkbox sender date date'
    'checkbox title attachment star';
  padding: var(--gap);
  gap: 1em;
}
.MailList-item:first-of-type {
  border-top: var(--line);
}
.MailList-item.read {
  background-color: #f5f5ff;
  font-weight: normal;
}

@media (min-width: 701px) {
  .MailList-item {
    grid-template-columns: auto auto 14em 3fr auto auto;
    grid-template-areas: ' checkbox star sender title attachment date ';
  }
}
.MailPreview-attachment {
  grid-area: attachment;
  justify-self: end;
}
.MailPreview-checkbox {
  align-self: center;
  grid-area: checkbox;
}

.MailPreview-date {
  grid-area: date;
}

.MailPreview-details {
  display: contents;
}

.MailPreview-sender {
  grid-area: sender;
}
.MailPreview-star {
  background: #b2b8be;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  grid-area: star;
  justify-self: center;
}
.MailPreview-title {
  grid-area: title;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
