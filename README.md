# vue3-ts-template

本專案使用 Vue3 + Vite + TypeScript 開發

## 目錄

- [專案架構](#專案架構)
- [撰寫風格](#撰寫風格)
- [撰寫風格 - vue 檔撰寫風格](#vue-檔撰寫風格)
- [撰寫風格 - 呼叫 API](#呼叫-api)
- [撰寫風格 - Enum 有意義變數名稱判斷](#enum-有意義變數名稱判斷)
- [撰寫風格 - 全局事件綁定](#全局事件綁定)

## **專案架構**

    ```bash
    .
    ├── .vscode                # VS Code 設定檔
    │   ├── extensions.json    # 編輯器套件
    │   ├── settings.json      # 編輯器設定
    │   └── xxx.code-snippets  # 程式碼模板
    ├── cypress                # e2e測試
    ├── public                 # 靜態資源
    ├── src                    # 開發資源
    │   ├── assets             # 共用資源
    │   ├── components         # 共用組件
    │   ├── composables        # 共用 Vue 組合式函數
    │   ├── enums              # enums檔
    │   ├── instances          # class實例檔
    │   ├── models             # 共用型別
    │   ├── router             # 路由設定
    │   ├── services           # API Services
    │   ├── stores             # 狀態管理
    │   ├── views              # 頁面組件
    │   ├── app.vue            # 根組件
    │   └── main.ts            # 進入點
    └── types                  # 全域型別

    ```

## **撰寫風格**

1. 參考 [Vue 官方程式碼風格規範 Style Guide](https://vuejs.org/style-guide)

2. Setup script 中，ref(), reactive(), computed() 等相關 [Vue Reactivity API](https://vuejs.org/api/reactivity-core.html#reactivity-api-core)，以及 [Lifecycle](https://vuejs.org/api/composition-api-lifecycle.html) 以自動 import 可不需要 import。

3. <mark>知道型別的情況下，務必定義型別，切勿使用 any，object 務必定義<mark>。

4. 已引入 [vueuse](https://vueuse.org/) 工具包，請多加利用。

5. 使用工具檢查及規範
   - [EditorConfig](https://editorconfig.org) - 統一 Visual Studio Code 檔案排版設定。
   - [ESLint](https://eslint.org) - 檢查程式碼語法、統一編寫風格。
   - [Prettier](https://prettier.io) - 統一程式碼排版風格。
   - [StyleLint](https://stylelint.io) - 檢查樣式語法、統一編寫風格。

### **vue 檔撰寫風格**

1. vue 檔中輸入 `!vue define`，使用 snippets 自動建立撰寫模板。

2. 組件名稱使用至少 2 個英文單字命名（防止與現在或未來的 Html 標籤重名）。

3. 組件名稱使用 `Kebab Case` 規則，單字用 - 隔開，例如 app-table.vue、user-list.vue。

4. script 寫法 - `TypeScript + composition api + setup`。

5. style 寫法 - SCSS + scoped。

6. 編排順序

   1. type / interface。
   2. props / emits type 宣告。
   3. [defineOptions](https://vue-macros.sxzz.moe/macros/define-options.html)。
   4. [Props (defineProps)](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)，使用 types 方式宣告，預設值須加上 [withDefaults](https://vuejs.org/guide/typescript/composition-api.html#props-default-values)。
   5. [Events (defineEmits)](https://cn.vuejs.org/guide/components/events.html#component-events)。
   6. [route/router](https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api)。
   7. [store 相關](https://pinia.vuejs.org/zh/core-concepts/#using-the-store)。
   8. 非響應式變數。
   9. [子組件 ref](https://cn.vuejs.org/guide/essentials/template-refs.html#template-refs)。
   10. [ref 變數](https://cn.vuejs.org/api/reactivity-core.html#ref)。
   11. [reactive 變數](https://cn.vuejs.org/api/reactivity-core.html#reactive)。
   12. [computed](https://cn.vuejs.org/api/reactivity-core.html#computed)。
   13. function / async/await function。
   14. [生命週期 (Lifecycle hooks)](https://cn.vuejs.org/api/composition-api-lifecycle.html)。
   15. [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)。

   ```ts
   <script setup lang="ts">
     type Value = string | number

     interface User {
       id: string
       name: string
     }

     // props, emits type declaration
     export interface Props {}
     export interface Emits {}

     // 設定 name 或 inheritAttrs
     defineOptions({
       name: 'example-component'
     })

     // Props 相關
     const props = defineProps<Props>()
     // Emit 相關
     const emit = defineEmits<Emits>()

     // route 相關
     const route = useRoute()
     const router = useRouter()

     // store 相關
     const userStore = useUserStore()
     const { setUser } = userStore
     const { userData } = storeToRefs(userStore)

     /**
      * 子組件 ref
     * 命名 - 子組件名稱 + Ref(後綴)
     * 型別 - 組件實例型別 | null
     */
     const inputRef = ref<ComponentInstanceType>(null)

     // ref 變數定義
     const var1 = ref<string>('')

     // reactive 變數定義
     const var2 = reactive<User>({
       id: '0',
       name: 'Vue'
     })

     // computed
     const var 3 = computed(() => {
       return ...
     })

     // watch 及其他 watch 相關方法
     watch(var1 => {
       ...
     })


     // 一般方法
     function method1() {
       ...
     }

     // Async/Await 方法
     async function method2() {
       await...
     }

     // 生命週期 (Lifecycle Hooks)
     onMounted(() => {
       ...
     })
     ...其他生命週期方法

     // defineExpose - 定義外部可訪問的變數或方法
     defineExpose({ var1, var2, var3, method1, method2 })
   </script>

   <template>
   ...
   </template>

   <style lang="scss" scoped>
   ...
   </style>
   ```

### **呼叫 API**

1.

### **Enum 有意義變數名稱判斷**

1. 判斷常數值，建立 `enum` 以有意義變數名稱來判斷，共用的可放置 `src/enums`，該功能自己所屬的放置該功能 `enums` 資料夾下。

```ts
// 狀態 enum
const enum Status {
  Normal = '1',
  Error = '2',
}

const status = '1';

if (status === Status.Normal) {
  // do something
}
```

### **全局事件綁定**

1. `onUnmounted` 時需移除綁定事件。

2. 使用 [useEventListener](https://vueuse.org/core/useEventListener/#useeventlistener)，該工具以實現自動移除所綁定的事件。

```ts
// 組件掛載後，綁定事件
onMounted(() => {
  window.addEventListener('mousemove', update);
});

// 組件卸載後，移除事件
onUnmounted(() => {
  window.removeEventListener('mousemove', update);
});
```
