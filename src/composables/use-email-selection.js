import { reactive } from 'vue';

let emails = reactive(new Set());

export const useEmailSelection = function () {
  let addMultiple = (newEmails) =>
    newEmails.forEach((email) => emails.add(email));
  let clear = () => emails.clear();
  let toggle = function (email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  };
  return {
    addMultiple,
    clear,
    emails,
    toggle,
  };
};

export default useEmailSelection;
