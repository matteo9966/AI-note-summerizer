import type { JSX } from "preact/jsx-runtime";

import Table from '../Table';
import type { Note } from '../../services/NotesService';

interface NotesTableProps {
  notes: Note[];
}

function NotesTable({ notes }: NotesTableProps) {
  const columns = [
    {
      key: 'id' as keyof Note,
      header: 'ID',
      render: (value: string) => value,
    },
    {
      key: 'title' as keyof Note,
      header: 'Title',
      render: (value: string,) => value,
    },
    {
      key: 'content' as keyof Note,
      header: 'Content',
      render: (value: string) => value.length > 100 ? value.substring(0, 100) + '...' : value,
    },
    {
      key: 'createdAt' as keyof Note,
      header: 'Created At',
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      key: 'updatedAt' as keyof Note,
      header: 'Updated At',
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  return <Table<Note> columns={columns} data={notes} />;
}

export default NotesTable;