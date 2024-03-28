# vue3-ts-template

本專案使用 Vue3 + Vite + TypeScript 開發

- Node 18 or >=20

- 支援 [Volta](https://volta.sh/)

- 使用 [pnpm](https://pnpm.io/) >=7

## 代辦事項

### 套件 issue 追蹤

## 開發流程

1. 修改一律開新分支，base branch 依據開發功能。

2. 禁止停用/忽略 lint 規則、不合理忽略該檔案的檢查。

3. `TODO` 、 `FIXME`: 等註解標籤完成請移除。

4. `console.log` 非正式需顯示用的，請在功能完成後移除。

5. devtools console 如有錯誤需修正。

6. git commit 時有顯示任何 linter 錯誤不能忽略並 push。

## Commit 規範

Commit 訊息依照 [約定式提交 (Conventional Commits)](https://www.conventionalcommits.org/zh-hant/v1.0.0/)。

```text
<類型 type>[可選的作用範圍 scope]: <描述 description>

[可選的正文 body]

[可選的頁腳 footer]
```

### Type

- chore: 其他，並且也不會修改原始碼或是測試。
- revert: 回復前一個提交的 commit。
- build: 影響構建系統或外部依賴項的更改。
- ci: 更改我們的 CI 配置文件和腳本。
- docs: 文檔的修改。
- feat: 功能新增修改。
- fix: 修復 Bug。
- perf: 提升效能的改進。
- refactor: 重構現有程式碼，不屬於新增新功能或是修 bug。
- style: 不影響功能的更改（空格、格式、缺少分號等）。
- test: 測試。

## Usage

### 安裝套件

```bash
pnpm i
```

### 新增套件

```bash
pnpm add <pkg>
```

### 開發

visit <http://localhost:5173>

```bash
pnpm dev
```

### 編譯

To build the App, run

```bash
pnpm build
```

### 測試

```bash
pnpm test:unit
```

## 目錄

- [專案架構](#專案架構)
- [Plugins](#plugins)
- [撰寫風格](#撰寫風格)
  - [vue 檔撰寫風格](#vue-檔撰寫風格)
  - [型別](#型別)
  - [Enum](#enum)
  - [註解](#註解)
  - [全局事件綁定](#全局事件綁定)
  - [多國語](#多國語)

## **專案架構**

```bash
    ├── .husky                         # husky 設定
    ├── .vscode                        # VSCode 設定檔
    │   ├── extensions.json            # 編輯器套件
    │   ├── settings.json              # 編輯器設定
    │   ├── launch.json                # VSCode debugger extension 設定檔
    │   └── xxx.code-snippets          # 程式碼模板
    ├── environments                   # 所有環境變數
    │   ├── .env                       # 環境變數
    │   └── .env.[mode]                # 各模式的環境變數
    ├── eslint-plugins                 # eslint plugin
    │   └── .eslintrc-[plugin].cjs     # plugin eslint 設定
    ├── nginx                          # nginx 設定
    ├── public                         # 靜態資源
    ├── scripts                        # Command-Line
    ├── src                            # 開發資源
    │   ├── assets                     # 共用資源
    │   ├── components                 # 共用組件
    │   ├── composables                # 共用 Vue 組合式函數
    │   ├── constants                  # 共用常數
    │   ├── directives                 # Directives
    │   ├── enums                      # enums檔
    │   ├── i18n                       # 多國語
    │   ├── layouts                    # 路由 Layouts
    │   ├── models                     # 共用型別
    │   ├── plugins                    # plugins
    │   ├── router                     # 路由設定
    │   ├── services                   # API
    │   ├── stores                     # 狀態管理
    │   ├── symbols                    # 共用 Symbols
    │   ├── types                      # 全域型別檔
    │   ├── utils                      # 工具類
    │   ├── views                      # 頁面組件
    │   ├── app.vue                    # 根組件
    │   └── main.ts                    # 進入點
    └── .config.ts                     # 各式設定檔
```

## **Plugins**

專案中使用的主要套件清單，相關版本請查看 [package.json](./package.json)、[pnpm-lock.yaml](./pnpm-lock.yaml)。

### 套件

1. HTTP Client： [axios](https://github.com/axios/axios)。

2. State Management： [pinia](https://pinia.vuejs.org/)。

3. I18n： [vue-i18n](https://vue-i18n.intlify.dev/)。

4. Form Validator： [vee-validate](https://vee-validate.logaretm.com/v4/)。

5. Schema 定義驗證: [zod](https://zod.dev/)。

6. Component(UI) Library: [Primevue](https://primevue.org/)。

### 工具包

1. [vueuse](https://vueuse.org/)。

2. [lodash-es](https://lodash.com/)。

3. 樣式處理： [classnames](https://github.com/JedWatson/classnames)。

## **撰寫風格**

1. 參考 [Vue 官方程式碼風格規範 Style Guide](https://vuejs.org/style-guide)。

2. 變數命名使用 `Camel Case` 規則。

3. Setup script 中，ref(), reactive(), computed() 等相關 [Vue Reactivity API](https://vuejs.org/api/reactivity-core.html#reactivity-api-core)，以及 [Lifecycle](https://vuejs.org/api/composition-api-lifecycle.html) 以自動 import 可不需要 import。

   ***

   without

   ```ts
   import { computed, ref } from 'vue';

   const count = ref(0);
   const doubled = computed(() => count.value * 2);
   ```

   with

   ```ts
   const count = ref(0);
   const doubled = computed(() => count.value * 2);
   ```

4. 善加利用 [工具包](#plugins)。

5. 使用工具檢查及規範
   - [EditorConfig](https://editorconfig.org) - 統一 Visual Studio Code 檔案排版設定。
   - [ESLint](https://eslint.org) - 檢查程式碼語法、統一編寫風格。
   - [Prettier](https://prettier.io) - 統一程式碼排版風格。
   - [StyleLint](https://stylelint.io) - 檢查樣式語法、統一編寫風格。

### **vue 檔撰寫風格**

1. vue 檔中輸入 `!vue define`，使用 [snippets](./.vscode/global.code-snippets) 自動建立撰寫模板。

2. 組件名稱使用至少 2 個英文單字命名（防止與現在或未來的 Html 標籤重名）。

3. 組件檔名使用 `Kebab Case` 規則，單字用 - 隔開，例如 app-table.vue、user-list.vue。

4. script 寫法 - `TypeScript + composition api + setup`。

5. style 寫法 - SCSS + scoped。

6. 編排順序

   1. [defineOptions](https://vuejs.org/api/sfc-script-setup.html#defineoptions)。
   2. [Props (defineProps)](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)，使用 types 方式宣告，預設值須加上 [withDefaults](https://vuejs.org/guide/typescript/composition-api.html#props-default-values)。
   3. [Events (defineEmits)](https://cn.vuejs.org/guide/components/events.html#component-events)。
   4. [route/router](https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api)。
   5. [store 相關](https://pinia.vuejs.org/zh/core-concepts/#using-the-store)。
   6. 非響應式變數。
   7. [子組件 ref](https://cn.vuejs.org/guide/essentials/template-refs.html#template-refs)。
   8. [ref 變數](https://cn.vuejs.org/api/reactivity-core.html#ref)。
   9. [reactive 變數](https://cn.vuejs.org/api/reactivity-core.html#reactive)。
   10. [computed](https://cn.vuejs.org/api/reactivity-core.html#computed)。
   11. function / async/await function。
   12. [生命週期 (Lifecycle hooks)](https://cn.vuejs.org/api/composition-api-lifecycle.html)。
   13. [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)。

   ***

   Example:

   ```vue
   <script setup lang="ts">
   type Value = string | number;

   interface User {
     id: string;
     name: string;
   }

   // 設定 name 或 inheritAttrs
   defineOptions({
     name: 'ExampleComponent',
   });

   // Props 相關
   const props = defineProps<{}>();
   // Emit 相關
   const emit = defineEmits<{}>();

   // route 相關
   const route = useRoute();
   const router = useRouter();

   // store 相關
   const userStore = useUserStore();
   const { setUser } = userStore;
   const { userData } = storeToRefs(userStore);

   /**
    * 子組件 ref
    * 命名 - 子組件名稱 + Ref(後綴)
    * 型別 - 組件實例型別 | null
    */
   const inputRef = ref<ComponentInstanceType>(null);

   // ref 變數定義
   const var1 = ref<string>('');

   // reactive 變數定義
   const var2 = reactive<User>({
     id: '0',
     name: 'Vue',
   });

   // computed
   const var3 = computed(() => {
     return '...';
   });

   // watch 及其他 watch 相關方法
   watch((var1) => {
     // do something
   });

   // 一般方法
   function method1() {
     // do something
   }

   // Async/Await 方法
   async function method2() {
     await fn;
   }

   // 生命週期 (Lifecycle Hooks)
   onMounted(() => {
     // do something
   });

   // ...其他生命週期方法

   // defineExpose - 定義外部可訪問的變數或方法
   defineExpose({ var1, var2, var3, method1, method2 });
   </script>

   <template>...</template>

   <style lang="scss" scoped></style>
   ```

### **型別**

1. 務必定義型別，切勿使用 any。

2. API Response 的型別請勿異動，功能需使用 Response 做擴充時，interface 請使用 extends，type 使用 & 做擴充。

   ```ts
   interface User {
     name: string;
     age: number;
   }

   interface EditUser extends User {
     editedName: string;
   }

   type UserType = {
     name: string;
     age: number;
   };

   type EditUserType = UserType & {
     editedName: string;
   };
   ```

### **Enum**

1. 判斷常數，建立 `enum` 以有意義變數名稱來判斷，共用的可放置 `src/enums`，該功能自己所屬的放置該功能 `enums` 資料夾下。

```ts
// 狀態 enum
const enum Status {
  Normal = '1',
  Error = '2',
}

const status = '1';

// if /else statement
if (status === Status.Normal) {
  // do something
}

// switch statement
switch (status) {
  case Status.Normal:
    // do something
    break;
}
```

### **註解**

1. 變數註解

   為了讓 一般變數、class member 變數等 在編輯器可以有提示， 請使用使用 /\*\* \*/ 註解。

   ```ts
   interface User {
     /** 姓名 */
     name: string;
     /** 年齡 */
     age: number;
   }

   enum Status {
     /** 正常 */
     Normal = '1',
     /** 錯誤 */
     Error = '0',
   }

   class Foo {
     /** comment */
     foo = 'foo';

     /** comment */
     fooBar = 'fooBar';

     /**
      * Comment
      */
     getFoo(): void {}
   }

   /**
    * helloWorld string
    */
   const helloWorld = 'helloWorld';
   ```

2. 行註解

   使用 // 註解 (ctrl + / or command + /)，說明該行/區塊程式碼。

   ```ts
   // show hello world
   alert('hello world');
   ```

3. function 註解

   1. 使用 [JSDoc](https://jsdoc.app/index.html) 語法。

   2. function 參數或邏輯變更，註解記得一併修改。

   ```ts
   /**
    * 主體描述
    *
    * @param foo 參數 foo 說明
    * @param bar 參數 bar 說明
    * @returns 返回值說明
    */
   function fn(foo: string, bar: string): string {
     // do something
     return '....';
   }
   ```

### **全局事件綁定**

1. `onUnmounted` 時需移除綁定事件。

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

2. 使用 [useEventListener](https://vueuse.org/core/useEventListener/#useeventlistener)(建議)，該工具以實現自動移除所綁定的事件。

### **多國語**

1. 顯示在畫面中的文字都需要建立多國語，翻譯檔位置請參考相關[README.md](./src/i18n/README.md)。

---

Usage

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 在 computed 使用
const buttonText = computed(() => t('shared.button.cancel'));
</script>

<template>
  <div class="home">
    <!-- 使用 composition api -->
    <h1>{{ t('title') }}</h1>

    <!-- 使用全域的 -->
    <h1>{{ $t('title') }}</h1>

    <!-- 使用 computed -->
    <button>{{ buttonText }}</button>

    <!-- Component 的方式渲染 -->
    <i18n-t keypath="term" tag="label" for="tos">
      <a target="_blank">{{ $t('tos') }}</a>
    </i18n-t>
  </div>
</template>
```
