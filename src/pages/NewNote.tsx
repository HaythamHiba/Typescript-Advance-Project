import { NoteData, Tag } from "../App";
import NoteForm from "../forms/NoteForm";

type NewNoteProps={
  submitForm:(data:NoteData)=>void
  createTag:(tag:Tag)=>void
  availableOptions:Tag[]
}

export default  function NewNote({submitForm,createTag,availableOptions}:NewNoteProps) {
  return (
      <>
      <h1 className="mb-4">
        New Note
      </h1>
      <NoteForm submitForm={submitForm} availableOptions={availableOptions} createTag={createTag}/>
      </>
    )
}
