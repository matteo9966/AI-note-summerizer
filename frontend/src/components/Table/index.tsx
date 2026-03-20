import type { JSX } from "preact/jsx-runtime";

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
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key as string}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td
                key={col.key as string}
                className="px-6 py-4 whitespace-nowrap"
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
