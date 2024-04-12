<template>
  <div class="bulk-action-bar">
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
        Mark Read
      </button></span
    >
    <span class="buttons"
      ><button
        @click="emailSelection.markUnread()"
        :disabled="[...emailSelection.emails].every((e) => !e.read)"
      >
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
        Archive
      </button>
    </span>

    <span class="buttons"
      ><button
        v-if="screen !== 'trash'"
        @click="emailSelection.moveToTrash()"
        :disabled="[...emailSelection.emails].every((e) => e.folder == 'trash')"
      >
        Trash
      </button>
    </span>

    <span class="buttons"
      ><button
        v-if="screen !== 'spam'"
        @click="emailSelection.moveToSpam()"
        :disabled="[...emailSelection.emails].every((e) => e.folder == 'spam')"
      >
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
