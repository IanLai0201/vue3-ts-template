<script setup lang="ts">
// props, emits type declaration
export interface Props {
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}
export interface Emits {
  (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
});
const emit = defineEmits<Emits>();

const onClick = (e: MouseEvent) => {
  if (props.disabled) {
    return;
  }

  emit('click', e);
};
</script>

<template>
  <button :type="type" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>
