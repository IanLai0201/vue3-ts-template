<script lang="ts">
// declare additional options
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { useAttrs, shallowRef, nextTick } from 'vue';

// props, emits type declaration
export interface Props {
  modelValue: string;
  modelModifiers?: Record<string, boolean>;
}
export interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const el = shallowRef<HTMLInputElement | null>(null);
const attrs = useAttrs();
const value = useVModel(props, 'modelValue', emit);

const focus = () => {
  el.value?.focus();
};

const blur = () => {
  el.value?.blur();
};

const onChange = (e: Event) => {
  const el = e.target as HTMLInputElement;

  nextTick(() => {
    if (el.value !== props.modelValue) {
      el.value = props.modelValue;
    }
  });
};

defineExpose({
  focus,
  blur,
});
</script>

<template>
  <div class="input-wrap">
    <input ref="el" type="text" v-model="value" v-bind="attrs" @change="onChange" />
  </div>
</template>
