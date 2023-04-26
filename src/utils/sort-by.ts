import { SortOrder } from '@/enums/sort-order';

export type Sort = {
  /**
   * 條件欄位
   */
  sort: string;

  /**
   * 排序方法
   */
  order: SortOrder;
};

/**
 * 排序條件轉換排序 function
 *
 * @param sorts
 * @returns
 */
function createCompares(sorts: Sort[]) {
  return sorts.map((item) => compareFactory(item));
}

/**
 * 建立排序 function
 *
 * @param sort
 * @returns
 */
function compareFactory({ sort, order }: Sort) {
  return (a: any, b: any) => {
    // TODO support deep fields
    const valueA = a[sort];
    const valueB = b[sort];

    let result: number;

    switch (order) {
      case SortOrder.Asc:
        result = compareValue(valueA, valueB);
        break;

      case SortOrder.Desc:
        result = compareValue(valueB, valueA);
        break;

      default:
        result = 0;
    }

    if (isNaN(result)) {
      console.warn(
        `[Util warn] util 'sortBy' compare warning,
        field compare get NaN. compare field name is '${sort}',
        A value is '${valueA}', B value is '${valueB}'.`
      );

      return -Infinity;
    }

    return result;
  };
}

/**
 * 比對
 *
 * @param a
 * @param b
 * @returns
 */
function compareValue(a: any, b: any): number {
  return typeof a === 'string' || b === 'string' ? a.localeCompare(b) : a - b;
}

/**
 * 陣列多條件排序
 *
 * ----
 *
 * 範例：
 * ```` ts
 * const array = [
 *   {
 *     a: 1,
 *     b: 2,
 *   },
 *   {
 *     a: 1,
 *     b: 3,
 *   },
 * ];
 *
 * // 先依照 a 欄位 `ASC` 排序，相同時才再依照第二個條件排序(b 欄位 `DESC` 排序)
 * sortBy(array, [
 *   {
 *     sort: 'a',
 *     order: SortOrder.Asc,
 *   },
 *   {
 *     sort: 'b',
 *     order: SortOrder.Desc,
 *   },
 * ]);
 * ````
 *
 * @param value 陣列
 * @param sorts 排序條件
 * @returns
 */
export function sortBy<T extends Record<string, any>>(value: T[], sorts: Sort[]): T[] {
  const compares = createCompares(sorts);

  return value.sort((a, b) => {
    return compares.reduce(
      (result, compare) => result || compare(a, b),
      0 /* default compare value */
    );
  });
}
