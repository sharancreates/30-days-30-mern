const NoteList = ({ notes }) => {
  if (notes.length === 0) {
    return <p className="empty-msg">No notes found for this period.</p>;
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <small className="timestamp">
            {new Date(note.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default NoteList;