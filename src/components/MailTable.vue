<template>
  <ul class="mail-table">
    <li
      v-for="email in emails"
      :key="email.id"
      :class="['clickable mail-item', email.read ? 'read' : '']"
      @mouseenter="isHovering = email.id"
      @mouseleave="isHovering = null"
    >
      <span>
        <input
          type="checkbox"
          @click="emailSelection.toggle(email)"
          :checked="emailSelection.emails.has(email)"
        />
      </span>
      <span>
        <input
          class="starMask"
          type="checkbox"
          @click="toggleFavorite(email)"
          :checked="email.favorite"
        />
      </span>
      <span class="email-sender" @click="openEmail(email)">
        {{ email.firstname }} {{ email.surname }}
      </span>
      <span class="email-subject" @click="openEmail(email)">
        <strong> {{ email.subject }} </strong>
      </span>

      <span class="email-details">
        <button
          class="email-button"
          v-show="isHovering == email.id"
          @click="toggleArchive(email)"
        >
          <svg viewBox="0 0 512 512" v-if="email.folder === 'archive'">
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M2486 4965 c-14 -13 -31 -36 -36 -50 -6 -17 -10 -437 -10 -1163 l0 -1137 -309 309 -309 309 -49 4 c-42 4 -53 1 -80 -21 -44 -37 -58 -84 -39 -129 18 -45 813 -849 862 -872 68 -32 75 -27 392 289 418 415 552 558 562 600 16 71 -40 136 -118 136 l-46 0 -313 -312 -313 -313 0 1137 c0 726 -4 1146 -10 1163 -18 48 -58 75 -110 75 -36 0 -53 -6 -74 -25z"
              />
              <path
                d="M863 3745 c-17 -7 -43 -31 -56 -52 -14 -21 -201 -361 -416 -757 l-392 -719 3 -796 3 -796 24 -65 c36 -103 79 -169 160 -251 60 -60 94 -85 161 -117 47 -22 114 -47 150 -54 96 -19 4024 -19 4120 0 36 7 103 32 150 54 145 69 263 205 321 368 l24 65 3 796 3 795 -330 706 c-181 388 -340 727 -353 754 -41 83 -46 84 -384 84 -160 0 -306 -3 -323 -6 -41 -8 -86 -54 -95 -94 -7 -37 12 -87 44 -115 21 -19 39 -20 294 -23 l271 -3 276 -594 276 -593 -401 -5 c-422 -5 -438 -7 -566 -56 -117 -45 -241 -135 -315 -229 -25 -31 -69 -100 -98 -152 -93 -170 -232 -286 -388 -322 -77 -18 -861 -18 -938 0 -156 36 -295 152 -388 322 -29 52 -73 121 -98 152 -74 94 -198 184 -315 229 -128 49 -145 51 -557 56 -216 3 -393 8 -392 11 0 4 145 270 323 592 l322 585 216 5 c239 6 245 7 274 77 27 63 -17 143 -87 157 -17 3 -136 6 -263 6 -174 -1 -239 -4 -263 -15z m271 -1675 c107 -27 169 -63 252 -145 51 -51 85 -96 122 -165 93 -172 202 -283 357 -360 155 -77 179 -80 695 -80 516 0 540 3 695 80 155 77 264 188 357 360 37 69 71 114 122 165 83 82 145 118 252 145 71 18 111 20 486 20 l409 0 -3 -717 -3 -718 -31 -65 c-56 -118 -163 -199 -290 -220 -80 -13 -3908 -13 -3988 0 -127 21 -234 102 -290 220 l-31 65 -3 718 -3 717 409 0 c375 0 415 -2 486 -20z"
              />
            </g>
          </svg>
          <svg v-else>
            <g id="ic-archive-box">
              <path
                d="M5.5 8.5A.5.5 0 0 1 6 8h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5Z"
              ></path>
              <path
                fill-rule="evenodd"
                d="M2 6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm0-3h12v2H2V3Zm1 3v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6H3Z"
              ></path>
            </g>
          </svg>
        </button>
        <button
          class="email-button"
          v-show="isHovering == email.id"
          @click="toggleRead(email)"
        >
          <svg viewBox="0 0 16 16" v-if="email.read">
            <path
              fill-rule="evenodd"
              d="M14 8.195V11.8c0 .577 0 .949-.024 1.232-.022.272-.06.373-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085C12.75 14 12.377 14 11.8 14H4.2c-.577 0-.949 0-1.232-.024-.272-.022-.373-.06-.422-.085a1 1 0 0 1-.437-.437c-.025-.05-.063-.15-.085-.422C2 12.75 2 12.377 2 11.8V8.195l5.213 3.218a1.497 1.497 0 0 0 1.574 0L14 8.195Zm-.004-1.173-5.735 3.54a.497.497 0 0 1-.522 0l-5.735-3.54a1.39 1.39 0 0 1 .032-.348 1 1 0 0 1 .157-.323c.062-.084.154-.167.645-.555l3.8-2.995c.365-.287.598-.47.787-.598.178-.12.262-.153.311-.166a1 1 0 0 1 .528 0c.05.013.133.046.311.166.19.128.422.31.787.598l3.8 2.995c.491.388.583.471.645.555a1 1 0 0 1 .156.323c.018.065.028.139.033.348ZM1 7.524c0-.57 0-.855.073-1.117a2 2 0 0 1 .314-.647c.16-.22.385-.396.832-.749l3.8-2.995c.708-.558 1.062-.837 1.453-.944a2 2 0 0 1 1.056 0c.391.107.745.386 1.453.944l3.8 2.995c.447.353.671.53.832.75.143.194.25.413.314.646.073.262.073.547.073 1.117V11.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C13.48 15 12.92 15 11.8 15H4.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C1 13.48 1 12.92 1 11.8V7.524Z"
            />
          </svg>
          <svg v-else>
            <path
              fill-rule="evenodd"
              d="M13.5 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4.2 3h6.137c-.148.31-.251.647-.302 1H4.2c-.577 0-.949 0-1.232.024-.272.022-.373.06-.422.085a1 1 0 0 0-.437.437c-.025.05-.063.15-.085.422a4.518 4.518 0 0 0-.006.086l5.72 3.52a.5.5 0 0 0 .524 0l2.701-1.662c.247.258.532.48.846.653l-3.023 1.86a1.5 1.5 0 0 1-1.572 0L2 6.218V10.8c0 .577 0 .949.024 1.232.022.272.06.373.085.422a1 1 0 0 0 .437.437c.05.025.15.063.422.085C3.25 13 3.623 13 4.2 13h7.6c.577 0 .949 0 1.232-.024.272-.022.373-.06.422-.085a1 1 0 0 0 .437-.437c.025-.05.063-.15.085-.422C14 11.75 14 11.377 14 10.8V7.965c.353-.051.69-.154 1-.302V10.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C13.48 14 12.92 14 11.8 14H4.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C1 12.48 1 11.92 1 10.8V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C2.52 3 3.08 3 4.2 3Z"
            />
          </svg>
        </button>
        <span
          class="attachment"
          v-show="isHovering !== email.id"
          v-if="email.attachment"
        >
          <svg viewBox="0 0 20 20">
            <path
              fill="#555"
              d="M3.26370324,8.57901468 C2.99453017,8.85144476 2.55815971,8.85139888 2.28904255,8.5789122 C2.01992538,8.30642553 2.0199707,7.86468321 2.28914377,7.59225313 L8.31841803,1.49869904 C9.6814954,0.444085855 11.0494163,-0.0634259367 12.4102348,0.00632825194 C14.1258309,0.0942679855 15.4624193,0.748186494 16.5955255,1.82083609 C17.7517135,2.91533596 18.5,4.4761857 18.5,6.36786284 C18.5,7.82020638 18.0777556,9.09825417 17.1873382,10.2322297 L8.68369766,18.992369 C7.82306461,19.6971651 6.86800034,20.0383772 5.84464483,19.9965751 C4.54447205,19.9434657 3.57689721,19.5225003 2.85751064,18.812055 C2.01566307,17.9806708 1.5,16.9595407 1.5,15.586809 C1.5,14.4947997 1.87673374,13.4871176 2.65464506,12.5414674 L10.1390133,4.89886776 C10.7397414,4.25929091 11.3262525,3.87857385 11.9260788,3.78745695 C12.7592435,3.66089468 13.5630715,3.94799237 14.125324,4.54188726 C14.6582899,5.10484729 14.8863791,5.80668361 14.8061508,6.60631594 C14.7514821,7.15119754 14.5282081,7.65301591 14.1180011,8.13362927 L7.23878241,15.1818274 C6.97126126,15.4559198 6.5348987,15.4585772 6.26413935,15.1877628 C5.99338001,14.9169484 5.99075494,14.475214 6.25827609,14.2011216 L13.1050596,7.18854878 C13.3043212,6.95383296 13.4095414,6.71734597 13.4348274,6.46532072 C13.4749133,6.06578671 13.3787672,5.76994273 13.1301718,5.507357 C12.8740282,5.23679814 12.515784,5.10884654 12.1306257,5.16735419 C11.8867692,5.20439732 11.5466923,5.42514859 11.1279193,5.87078347 L3.67468228,13.4778958 C3.13824791,14.1329762 2.87837838,14.8280715 2.87837838,15.586809 C2.87837838,16.5407878 3.22343307,17.2240746 3.82004074,17.813267 C4.29545562,18.2827729 4.93985667,18.5631342 5.9002189,18.6023631 C6.57923469,18.6300995 7.20937629,18.4049713 7.75849029,17.9611447 L16.1548885,9.3108071 C16.800384,8.48404341 17.1216216,7.51172274 17.1216216,6.36786284 C17.1216216,4.88582368 16.545304,3.68368344 15.6540647,2.83999601 C14.743984,1.97847246 13.7042594,1.46979297 12.340529,1.39988952 C11.3332737,1.34825863 10.2755553,1.74068233 9.22420262,2.5463929 L3.26370324,8.57901468 Z"
            />
          </svg>
        </span>
        <span v-show="isHovering !== email.id">
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
import BulkActionBar from './BulkActionBar.vue';
import MailService from '@/services/MailService';
import MailView from './MailView.vue';
import ModalView from './ModalView.vue';
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
    BulkActionBar,
    MailView,
    ModalView,
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

<style scoped></style>
