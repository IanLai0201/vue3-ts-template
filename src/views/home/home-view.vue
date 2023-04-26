<script setup lang="ts">
import { invoke, until } from '@vueuse/core';

import { useDelegateApi } from '@/composables/use-delegate-api';
import { useInvokeApi } from '@/composables/use-invoke-api';
import { SortOrder } from '@/enums/sort-order';
import { StorageKey } from '@/enums/storage-key';
import { ApiExample } from '@/services/api/example';
import { formatMessage } from '@/utils/format-message';
import { sortBy } from '@/utils/sort-by';

defineOptions({
  name: 'HomeView',
});

// const { invokeApi, cancelAll } = useInvokeApi();
const { delegateApi, cancelAll } = useDelegateApi();
const { response, execute, cancel } = useInvokeApi(ApiExample, 'get', {
  onSuccess: (r) => {
    console.log('result >>>', r);
  },
});

// const { execute: exec1 } = invokeApi(apiExample, 'GET');
const { execute: exec2 } = delegateApi(ApiExample, 'get');
// const { execute: exec3 } = delegateApi(ApiExample, 'get');

const executeApi = async () => {
  try {
    // const { execute: exec2 } = delegateApi(ApiExample, 'get');
    const r1 = await exec2({ test: [123, 111] });

    // const [r1, r2] = await Promise.all([exec1({ test: 123 }), exec2({ test: 111 })]);
    // const r1 = await invokeApi(apiExample, 'GET').execute({ test: 123 });

    // const r2 = await exec2({ test: 111 });

    console.log(r1);
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  const array = [
    {
      a: 1,
      b: 2,
    },
    {
      a: 1,
      b: 3,
    },
  ];

  console.log(
    sortBy(array, [
      {
        sort: 'a',
        order: SortOrder.Asc,
      },
      {
        sort: 'b',
        order: SortOrder.Desc,
      },
    ])
  );
  console.log(formatMessage('{{a}} 範例文字: {{a}}', { a: '替1', b: '替2' }));
});
</script>

<template>
  <div class="home">
    <h1>This is an home page</h1>
    <button @click="executeApi()">Execute</button>
    <button @click="cancel()">Cancel</button>
    {{ response?.['data'] }}
  </div>
</template>

<style lang="scss" scoped>
@media (width >= 1024px) {
  .home {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
