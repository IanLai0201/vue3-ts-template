export type Args = string[] | { [key: string]: any };
export type Template = { start: string; end: string };

/**
 * 正則表達的字符跳脫
 *
 * @param value
 * @returns
 */
function escape(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 格式化文字
 *
 * ----
 *
 * 範例：
 *
 * ```` ts
 * // 傳入陣列，依陣列 index 替換相對應位置
 * formatMessage('範例文字: {{0}}', ['替']);
 *
 * // 傳入物件，依物件 key 替換相對應位置
 * formatMessage('{{a}} 範例文字: {{b}}', { a: '替1', b: '替2' });
 *
 *
 * ````
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
  const start = escape(template.start);
  const end = escape(template.end);

  function regExp(key: string | number) {
    return new RegExp(`${start}${key}${end}`, 'gi');
  }

  function replace(msg: string, key: string | number, value: any) {
    return msg.replace(regExp(key), value);
  }

  if (Array.isArray(args)) {
    args.forEach((item, index) => {
      msg = replace(msg, index, item);
    });
  } else {
    Object.entries(args).forEach(([key, item]) => {
      msg = replace(msg, escape(key), item);
    });
  }

  return msg;
}
