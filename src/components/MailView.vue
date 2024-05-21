<template>
  <div>
    <nav class="ActionBar">
      <input
        class="starMask"
        type="checkbox"
        @click="toggleFavorite"
        :checked="email.favorite"
      />
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}
      </button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </nav>
    <h2 class="MailView-title">
      Subject : <strong>{{ email.subject }}</strong>
    </h2>
    <p class="MailView-details">
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
    let toggleFavorite = () => {
      emit('changeEmail', { toggleFavorite: true, save: true });
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
      emit('', { changeIndex: 1, toggleArchive: true, save: true });
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
      toggleFavorite,
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

<style scoped>
.MailView-details {
  margin: 1em 0;
  font-weight: bolder;
}

.MailView-title {
  margin: 1em 0;
}
</style>
