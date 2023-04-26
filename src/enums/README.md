# [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

## 建立

1. ts 檔中輸入 `!enum`，使用 snippets 自動建立撰寫模板。

2. 檔名使用 `Kebab Case` 規則，單字用 `-` 隔開。

3. 定義 Enum 名稱，`檔名 Pascal Case`。

4. Enum Key 命名使用 `Pascal Case`。

5. 使用 [`Named Export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。

## 範例

```typescript
/**
 * Storage key
 */
export enum StorageKey {
  /**
   * Access token
   */
  AccessToken = 'accessToken',

  /**
   * Refresh token
   */
  RefreshToken = 'refreshToken',
}
```
