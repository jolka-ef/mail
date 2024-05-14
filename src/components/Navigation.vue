<template>
  <nav class="FolderNav">
    <BaseButton
      class="FolderNav-button"
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
      class="FolderNav-button"
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
      class="FolderNav-button"
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
      class="FolderNav-button"
      @click="$emit('selectScreen', 'trash')"
      :disabled="screen == 'trash'"
    >
      <span class="FolderName">
        <Trash />
        Trash
      </span>
    </BaseButton>

    <BaseButton
      class="FolderNav-button"
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
<style>
.FolderCount {
  margin-left: auto;
}
.FolderName {
  display: flex;
  align-items: center;
  gap: 0.35em;
  margin-right: 0.5em;
}
.FolderNav {
  grid-area: sidebarNav;
  display: flex;
  gap: 0.25em;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.75em 0;
  @media (max-width: 480px), (min-width: 700px) {
    flex-direction: column;
    justify-content: unset;
  }
}
.FolderNav-button {
  margin: 0.6em 0;
}
</style>
