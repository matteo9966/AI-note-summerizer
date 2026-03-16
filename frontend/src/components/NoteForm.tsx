import { useState } from "preact/hooks";

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string }) => void;
}

const NoteForm = ({ onSubmit }:NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)}
          required
        />
      </div>
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;