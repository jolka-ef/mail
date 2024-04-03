import axios from 'axios';
import { reactive } from 'vue';
import { serverAddress } from '@/utils/serverAddress';
let emails = reactive(new Set());

export const useEmailSelection = function () {
  let archive = () => {
    forSelected((e) => (e.archived = true));
    clear();
  };
  let addMultiple = (newEmails) =>
    newEmails.forEach((email) => emails.add(email));
  let forSelected = (fn) => {
    emails.forEach((email) => {
      fn(email);
      axios.put(`${serverAddress}/emails/${email.id}`, email);
    });
  };
  let markRead = () => forSelected((e) => (e.read = true));

  let markUnread = () => forSelected((e) => (e.read = false));
  let clear = () => emails.clear();
  let toggle = function (email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };
  return {
    archive,
    addMultiple,
    clear,
    emails,
    markRead,
    markUnread,
    toggle,
  };
};

export default useEmailSelection;
