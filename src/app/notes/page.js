import { fetchNotes } from "@/actions/notes";
import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import { getUser } from "@/lib/token";

async function Notes() {
  const notes = await fetchNotes();
  const user = await getUser();

  let noteModal;
  if (user) noteModal = <AddNoteModal />;

  return (
    <div className="p-5 min-h-screen bg-gray-900">
      {/* Don't give the user buttons they can't use! */}
      {noteModal}
      <NoteList notes={notes} />
    </div>
  );
}

export default Notes;
