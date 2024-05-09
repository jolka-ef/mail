<template>
  <nav class="FolderNav">
    <BaseButton
      @click="$emit('selectScreen', 'inbox')"
      :disabled="screen == 'inbox'"
    >
      <span class="FolderName">
        <Inbox />
        Inbox
      </span>
      <span class="FolderCount">
        {{ inboxCount }}
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'starred')"
      :disabled="screen == 'starred'"
    >
      <span class="FolderName">
        <Star />
        Starred
      </span>
      <span class="FolderCount">
        {{ starredCount }}
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'spam')"
      :disabled="screen == 'spam'"
    >
      <span class="FolderName">
        <Spam />
        Spam
      </span>
      <span class="FolderCount">
        {{ spamCount }}
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'trash')"
      :disabled="screen == 'trash'"
    >
      <span class="FolderName">
        <Trash />
        Trash
      </span>
    </BaseButton>

    <BaseButton
      @click="$emit('selectScreen', 'archive')"
      :disabled="screen == 'archive'"
    >
      <span class="FolderName">
        <Archive />
        Archived
      </span>
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
