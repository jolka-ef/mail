<template>
  <nav class="Navigation">
    <BaseButton
      @click="$emit('selectScreen', 'inbox')"
      :disabled="screen == 'inbox'"
    >
      <span>
        <Inbox />
        Inbox
      </span>
      <span>
        {{ inboxCount }}
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'starred')"
      :disabled="screen == 'starred'"
    >
      <span>
        <Star />
        Starred
      </span>
      <span>
        {{ starredCount }}
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'spam')"
      :disabled="screen == 'spam'"
    >
      <span>
        <Spam />
        Spam
      </span>
      <span>
        {{ spamCount }}
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'trash')"
      :disabled="screen == 'trash'"
    >
      <Trash />
      Trash
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'archive')"
      :disabled="screen == 'archive'"
    >
      <Archive />
      Archived
    </BaseButton>
  </nav>
</template>
<script>
import Archive from '../icons/Archive.vue';
import BaseButton from './BaseButton.vue';
import Inbox from '../icons/Inbox.vue';
import Spam from '@/icons/Spam.vue';
import Star from '@/icons/Star.vue';
import Trash from '@/icons/Trash.vue';
export default {
  components: {
    Archive,
    BaseButton,
    Inbox,
    Spam,
    Star,
    Trash,
  },
  props: {
    inboxCount: {
      type: Number,
      required: true,
    },
    screen: {
      type: String,
      required: true,
    },

    spamCount: {
      type: Number,
      required: true,
    },
    starredCount: {
      type: Number,
      required: true,
    },
  },
};
</script>
