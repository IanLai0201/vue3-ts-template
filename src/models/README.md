# 型別

## 建立

1. ts 檔中輸入 `!model interface define`，使用 [snippets](../../.vscode/global.code-snippets) 自動建立 `interface` 撰寫模板。

2. ts 檔中輸入 `!model type define`，使用 [snippets](../../.vscode/global.code-snippets) 自動建立 `type` 撰寫模板。

3. 檔名使用 `Kebab Case` 規則，單字用 `-` 隔開。

4. 定義型別名稱，`檔名 Pascal Case`。

5. 巢狀物件，子層定義在同一支檔案內，命名 `${父層}${子層欄位名稱}`，遵守 `Pascal Case` 規則。

   ```ts
   interface User {
     name: string;
     age: number;
     children: UserChildren[];
   }

   interface UserChildren {
     name: string;
     age: number;
   }
   ```

6. 使用 [`Named Export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_named_exports)。
