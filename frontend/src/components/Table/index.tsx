import type { JSX } from "preact/jsx-runtime";

import styles from './Table.module.css';

interface Column<T> {
  key: keyof T;
  header: string;
  render: (value: T[keyof T], row: T) => JSX.Element | string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key as string}
              className={styles.th}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row, index) => (
          <tr key={index} className={styles.tr}>
            {columns.map((col) => (
              <td
                key={col.key as string}
                className={styles.td}
              >
                {col.render(row[col.key], row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
