import { onBeforeUnmount } from 'vue';
let useKeydown = (keyCombos) => {
  let onKeydown = (event) => {
    let keyCombo = keyCombos.find((keyCombo) => keyCombo.key == event.key);
    if (keyCombo) {
      keyCombo.fn();
    }
  };
  window.addEventListener('keydown', onKeydown);
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown);
  });
};

export default useKeydown;
