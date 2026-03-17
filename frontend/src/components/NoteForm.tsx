import { useState } from "preact/hooks";

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string }) => void;
  submitLabel?: string;
}

const NoteForm = ({ onSubmit, submitLabel = "Create Note" }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm space-y-4"
      aria-label="Create note form"
    >
      <div className="grid gap-1">
        <label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
          required
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Short, descriptive title"
        />
      </div>

      <div className="grid gap-1">
        <label htmlFor="content" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={content}
          onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)}
          required
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
          placeholder="Write or paste your note content here"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;