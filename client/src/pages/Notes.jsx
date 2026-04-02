import { useState } from "react";
import { Button } from "../components/Button";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>
        <Button variant="primary">Add Note</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No notes yet
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-4">{note.content}</p>
              <p className="text-xs text-gray-500">
                by {note.createdBy} on {note.createdAt}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
