<template>
  <div class="ActionBar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>
    <span class="buttons"
      ><button
        @click="emailSelection.markRead()"
        :disabled="[...emailSelection.emails].every((e) => e.read)"
      >
        <CloseEnvelope />
        Mark Read
      </button></span
    >
    <span class="buttons"
      ><button
        @click="emailSelection.markUnread()"
        :disabled="[...emailSelection.emails].every((e) => !e.read)"
      >
        <OpenEnvelope />
        Mark Unread
      </button></span
    >
    <span class="buttons"
      ><button
        v-if="screen !== 'archive'"
        @click="emailSelection.archive()"
        :disabled="
          [...emailSelection.emails].every((e) => e.folder == 'archive')
        "
      >
        <Archive />
        Archive
      </button>
    </span>

    <span class="buttons"
      ><button
        v-if="screen !== 'trash'"
        @click="emailSelection.moveToTrash()"
        :disabled="[...emailSelection.emails].every((e) => e.folder == 'trash')"
      >
        <Trash />
        Trash
      </button>
    </span>

    <span class="buttons"
      ><button
        v-if="screen !== 'spam'"
        @click="emailSelection.moveToSpam()"
        :disabled="[...emailSelection.emails].every((e) => e.folder == 'spam')"
      >
        <Spam />
        Spam
      </button>
    </span>

    <span class="buttons"
      ><button
        v-if="screen !== 'inbox'"
        @click="emailSelection.moveToInbox()"
        :disabled="[...emailSelection.emails].every((e) => e.folder == 'inbox')"
      >
        Inbox
      </button>
    </span>
  </div>
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
