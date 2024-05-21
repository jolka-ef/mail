<template>
  <ul class="MailList">
    <li
      v-for="email in emails"
      :key="email.id"
      :class="['MailList-item', email.read ? 'read' : '']"
      @mouseenter="isHovering = email.id"
      @mouseleave="isHovering = null"
    >
      <CheckMail :email="email" />
      <CheckStar
        @toggleStar="toggleFavorite(email)"
        :checked="email.favorite"
      />
      <span class="MailPreview-sender" @click="openEmail(email)">
        {{ email.firstname }} {{ email.surname }}
      </span>
      <span class="MailPreview-title" @click="openEmail(email)">
        {{ email.subject }}
      </span>

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
import CheckMail from './CheckMail.vue';
import CheckStar from './CheckStar.vue';

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
    CheckMail,
    CheckStar,
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

<style>
.MailList {
  grid-area: mailList;
  align-self: start;
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

  align-items: center;

  /* padding: var(--gap); */
  /* nie moge bo klik */
  /* gap: 1em; */
}

.MailList-item:hover {
  box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
    0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
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
.MailPreview-button:last-of-type {
  padding-right: var(--gap-container);
}

.MailPreview-button {
  padding: 0.5em;
}

.MailPreview-date {
  grid-area: date;
  padding: var(--gap-container);
}

.MailPreview-sender,
.MailPreview-title {
  grid-area: sender;
  padding: var(--gap-container);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.MailPreview-sender {
  grid-area: sender;
}

.MailPreview-title {
  grid-area: title;
}
.ScreenOnly:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.MailPreview-buttons {
  grid-area: date;
}
.MailPreview-buttons > button {
  margin: 0.5em;
}
</style>
