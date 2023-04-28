# API

## ./api 建立 API (同 URL 一支檔案)

1. 於 ./api 下建立 API 定義檔，檔名依照 `API URL` 建立，使用 `Kebab Case` 規則，單字用 `-` 隔開。

2. ts 檔中輸入 `!api define`，使用 snippets 自動建立 API 定義撰寫模板。

3. 定義 API 名稱，`Api${檔名 Pascal Case}`。

4. 使用 [`Named Export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_named_exports)。

5. 繼承 `BaseApi` 抽象類別，依照 api method 呼叫對應父類別的 method。

6. 依照 Method 實作相對應的介面。

> - `GET` 帶入 QueryString 的查詢，實作 `DoApiGet` 介面。
> - `GET` 以 PathParameter 的查詢，實作 `DoApiGetBy` 介面。
> - `POST` 實作 `DoApiPost` 介面。
> - `PATCH` 實作 `DoApiPatch` 介面。
> - `PUT` 實作 `DoApiPut` 介面。
> - `DELETE` 實作 `DoApiDelete` 介面。

7. Response 需定義型別檔，放置 src/models 下。

```ts
const URL = '/api/example';

export class ApiExample extends BaseApi implements DoApiGet {
  get(params?: Record<string, any>, config?: AxiosRequestConfig<undefined>) {
    return super.execGet<ExampleGetReturnType>({
      ...config,
      url: this.getUrl(URL),
      params,
    });
  }
}
```

## [Axios instance](https://github.com/axios/axios)

1. 於 ./instance 下建立 axios instance。

2. 使用 [`Default Export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export)。
