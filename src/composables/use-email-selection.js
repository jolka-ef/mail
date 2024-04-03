import MailService from '@/services/MailService';
import { reactive } from 'vue';
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
      MailService.update(email);
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
