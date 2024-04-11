<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}
      </button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>
    <h2 class="mb-0">
      Subject : <strong>{{ email.subject }}</strong>
    </h2>
    <p>
      <em>{{ email.from }} on {{ formatDate(email.sendDate) }} </em>
    </p>
    <p v-html="marked(email.body)" />
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate.js';
import { marked } from 'marked';
import useKeydown from '@/composables/use-keydown';
export default {
  setup(props, { emit }) {
    let { email } = props;
    let toggleArchive = () => {
      emit('changeEmail', {
        toggleArchive: true,
        save: true,
        closeModal: true,
      });
    };
    let toggleRead = () => {
      emit('changeEmail', { toggleRead: true, save: true });
    };
    let goNewer = () => {
      emit('changeEmail', { changeIndex: -1 });
    };
    let goNewerAndArchive = () => {
      emit('changeEmail', { changeIndex: -1, toggleArchive: true, save: true });
    };
    let goOlder = () => {
      emit('changeEmail', { changeIndex: 1 });
    };
    let goOlderAndArchive = () => {
      emit('changeEmail', { changeIndex: 1, toggleArchive: true, save: true });
    };

    useKeydown([
      { key: 'k', fn: goNewer },
      { key: '[', fn: goNewerAndArchive },
      { key: 'j', fn: goOlder },
      { key: ']', fn: goOlderAndArchive },
      { key: 'e', fn: toggleArchive },
      { key: 'r', fn: toggleRead },
    ]);

    return {
      goNewer,
      goOlder,
      formatDate,
      marked,
      toggleArchive,
      toggleRead,
    };
  },
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
