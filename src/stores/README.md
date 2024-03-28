# [Store (Pinia)](https://pinia.vuejs.org/core-concepts/#defining-a-store) 🍍

## 建立 Store

1. ts 檔中輸入 `!store define`，使用 [snippets](../../.vscode/global.code-snippets) 自動建立 Setup Stores 撰寫模板。

2. 檔名使用 `Kebab Case` 規則，單字用 `-` 隔開，例如 loading.ts、todo-list.ts。

3. 定義 Store 名稱，`use${檔名 Pascal Case}`。

4. 使用 [`Named Export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_named_exports)。

5. Setup Stores 的 export 參數中，變數使用 [`readonlyRef`](https://vuejs.org/api/reactivity-core.html#readonly) 封裝，不提供外部直接修改，export 相關 function 提供外部修改參數。

6. Setup Stores 中，ref(), reactive(), computed() 等相關 [Vue Reactivity API](https://vuejs.org/api/reactivity-core.html#reactivity-api-core)，以自動 import 可不需要 import。

## 範例 (Setup Stores)

```typescript
import { defineStore } from 'pinia';

/**
 * Loader Store
 */
export const useLoaderStore = defineStore('loader', () => {
  const loading = ref(false);

  function start() {
    // do start
  }

  function stop() {
    // do stop
  }

  return {
    // 參數以 readonly 封裝後暴露給外部使用
    loading: readonly(loading),
    start,
    stop,
  };
});
```
