import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap";
import {Routes,Route,Navigate} from 'react-router';
import NewNode from "./NewNote";
import {useLocalStorage} from './useLocalStorage';
import {v4 as uuidV4} from 'uuid'
import MainPage from './MainPage';

export type RawNote={
  id:string
}&RawNoteData

export type RawNoteData={
  title:string
  markdown:string
  tagIds:string[]
}

export type Note={
  id:string
}&NoteData
export type NoteData={
  title:string
  markdown:string
  tags:Tag[]
}

export type Tag={
  label:string
  id:string
} 


function App() {

  const [notes,setNotes]=useLocalStorage<RawNote[]>("NOTES",[]);
  const [tags,setTags]=useLocalStorage<Tag[]>("TAGS",[]);
  
  const noteWithTags=React.useMemo(()=>{
    return notes.map(note=>{
      return{...note,tags:tags.filter(tag=>note.tagIds.includes(tag.id))}
    })
  },[notes,tags])

  const onCreateNote=({tags,...data}:NoteData)=>{

    setNotes(prev => {
      return[...prev,
        {...data,id:uuidV4(),tagIds:tags.map(tag => tag.id)}
      ]
    })


  }
  const onCreateTag=(data:Tag)=>{

    setTags(prev=>[...prev,{...data}])
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={<MainPage notes={noteWithTags} tags={tags}/>}/>
        <Route path="/new" element={<NewNode availableOptions={tags} createTag={onCreateTag} submitForm={onCreateNote}/>}/>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route/>
      </Routes>
    </Container>
  )
}

export default App
