import React from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router'
import { Note } from '../App'

type NoteDataProps={
    notes:Note[]
}
export default function NoteData({notes}:NoteDataProps) {
    const {id}=useParams();
    let note=notes.find(note=>{
            if(note.id===id){
            
                return note
            }
        })
  
 
    if (note== null){
      return <Navigate to="/" replace/>
    }
   
    return <Outlet context={note}/>

    
}
export function useNote(){
  return useOutletContext<Note>();
}
