import { Note, NoteData, Tag } from "../App";
import { useNote } from "../components/NoteData";
import NoteForm from "../forms/NoteForm";

type EditNoteProps={
  submitForm:(id:string,data:NoteData)=>void
  createTag:(tag:Tag)=>void
  availableOptions:Tag[]
}

export default  function EditNote({submitForm,createTag,availableOptions}:EditNoteProps) {
    const note=useNote();
    const OnsubmitForm=(data:NoteData)=>{
        submitForm(note.id,{...data})
    }
    
  return (
      <>
      <h1 className="mb-4">
        Edit Note
      </h1>
      <NoteForm  submitForm={OnsubmitForm} note={note} availableOptions={availableOptions} createTag={createTag}/>
      </>
    )
}
