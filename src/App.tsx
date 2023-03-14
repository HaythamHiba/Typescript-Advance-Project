import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap";
import {Routes,Route,Navigate, useNavigate} from 'react-router';
import NewNote from "./pages/NewNote";
import {useLocalStorage} from './hooks/useLocalStorage';
import {v4 as uuidV4} from 'uuid'
import MainPage from './pages/MainPage';
import NoteData from './components/NoteData';
import SingleNote from './pages/SingleNote';
import EditNote from './pages/EditNote';

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
  const navigate=useNavigate();
  
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
  const onEditNote=(id:string,{tags,...data}:NoteData)=>{

    setNotes(prevNotes => {
       return prevNotes.map(note=>{
          if(note.id===id){
            return {...note,...data,tagIds:tags.map(tag=>tag.id)}
          }
          else{
            return note;
          }
        })
    })


  }
  const onCreateTag=(data:Tag)=>{

    setTags(prev=>[...prev,{...data}])
  }
  const onDeleteNote=(id:string)=>{
    setNotes(prevNotes=>{
      return prevNotes.filter(note=>note.id!==id)
    })
    navigate("/")
    
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<MainPage notes={noteWithTags}  tags={tags}/>}/>
        <Route path="/new" element={<NewNote availableOptions={tags} createTag={onCreateTag} submitForm={onCreateNote}/>}/>
        <Route path="/:id" element={<NoteData notes={noteWithTags}/>}>
          <Route index element={<SingleNote deleteNote={onDeleteNote}/>} />
          <Route path="edit" element={<EditNote availableOptions={tags} createTag={onCreateTag} submitForm={onEditNote}/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route/>
      </Routes>
    </Container>
  )
}

export default App
