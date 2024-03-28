# Util 工具

## 建立

1. ts 檔中輸入 `!util define`，使用 [snippets](../../.vscode/global.code-snippets) 自動建立撰寫模板。

2. 檔名使用 `Kebab Case` 規則，單字用 `-` 隔開。

3. 定義 function 名稱，`檔名 Camel Case`。

4. 註解撰寫，簡易說明工具用途以及相關參數說明。

5. 該 Util 自己使用的 type，直接定義在檔案內，並 `Named Export`。

6. 使用 [`Named Export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_named_exports)。

## 範例

```typescript
// export types
export type Args = string[] | { [key: string]: any };
export type Template = { start: string; end?: string };

/**
 * 格式化文字
 *
 * @param msg 文字樣版
 * @param args 替換參數
 * @param template 樣版開頭與結尾, 預設 {{ }}
 * @returns
 */
export function formatMessage(
  msg: string,
  args: Args,
  template: Template = { start: '{{', end: '}}' }
) {
  // do something

  return msg;
}
```

## Unit test

1. 檔名同 util，[util name].spec.ts。

2. ts 檔中輸入 `!test util define`，使用 [snippets](../../.vscode/global.code-snippets) 自動建立撰寫模板。

## 範例

```typescript
import { describe, it, expect } from 'vitest';

import { formatHrs } from './format-hrs';

describe('formatHrs', () => {
  it('format hrs value', () => {
    expect(formatHrs(0)).toBe('0.0');
    expect(formatHrs(1.22)).toBe('1.2');
  });
});
```
