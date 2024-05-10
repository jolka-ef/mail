<template>
  <nav class="ActionBar">
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="['ActionBar-checkbox', someEmailsSelected ? 'partial-check' : '']"
      @click="bulkSelect"
    />
    <BaseButton
      @click="emailSelection.markRead()"
      :disabled="[...emailSelection.emails].every((e) => e.read)"
    >
      <span class="ActionName">
        <CloseEnvelope />
        Mark Read
      </span>
    </BaseButton>

    <BaseButton
      @click="emailSelection.markUnread()"
      :disabled="[...emailSelection.emails].every((e) => !e.read)"
    >
      <span class="ActionName">
        <OpenEnvelope />
        Mark Unread
      </span>
    </BaseButton>

    <BaseButton
      v-if="screen !== 'archive'"
      @click="emailSelection.archive()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'archive')"
    >
      <span class="ActionName">
        <Archive />
        Archive
      </span>
    </BaseButton>

    <BaseButton
      v-if="screen !== 'trash'"
      @click="emailSelection.moveToTrash()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'trash')"
    >
      <span class="ActionName">
        <Trash />
        Trash
      </span>
    </BaseButton>

    <BaseButton
      v-if="screen !== 'spam'"
      @click="emailSelection.moveToSpam()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'spam')"
    >
      <span class="ActionName">
        <Spam />
        Spam
      </span>
    </BaseButton>

    <BaseButton
      v-if="screen !== 'inbox'"
      @click="emailSelection.moveToInbox()"
      :disabled="[...emailSelection.emails].every((e) => e.folder == 'inbox')"
    >
      <span class="ActionName">
        <Inbox />
        Inbox
      </span>
    </BaseButton>
  </nav>
</template>
<script>
import Archive from '../icons/Archive.vue';
import CloseEnvelope from '../icons/CloseEnvelope.vue';
import Inbox from '../icons/Inbox.vue';
import OpenEnvelope from '../icons/OpenEnvelope.vue';
import Spam from '../icons/Spam.vue';
import Trash from '../icons/Trash.vue';
import useEmailSelection from '@/composables/use-email-selection';
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';

export default {
  setup(props) {
    let emailSelection = useEmailSelection();
    let numberSelected = computed(() => emailSelection.emails.size);
    let numberEmails = computed(() => props.emails.length);
    let allEmailsSelected = computed(
      () => numberSelected.value === numberEmails.value
    );
    let someEmailsSelected = computed(
      () =>
        numberSelected.value > 0 && numberSelected.value < numberEmails.value
    );
    let bulkSelect = function () {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };

    return {
      allEmailsSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
      someEmailsSelected,
    };
  },
  components: {
    Archive,
    BaseButton,
    CloseEnvelope,
    OpenEnvelope,
    Inbox,
    Spam,
    Trash,
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
    screen: {
      type: String,
      required: true,
    },
  },
};
</script>
