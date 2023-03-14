import React from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNote } from '../components/NoteData'
import ReactMarkdown from 'react-markdown';

type SingleNoteProps={
    deleteNote:(id:string)=>void
}
export default function SingleNote({deleteNote}:SingleNoteProps) {
    const note=useNote();
  return (
  <>
  <Row className='align-items-center mb-4'>
    <Col>
        <h1>{note.title}</h1>
      
        {note.tags.length>0 && <Stack className='flex-wrap' gap={1} direction="horizontal">
                {
                  note.tags.map(tag=>
                  <Badge className='text-truncate'   key={tag.id}>
                    
                  
                      {tag.label}
                    
                    </Badge>)
                }

        </Stack>}
    </Col>
    <Col xs="auto" >
        <Stack direction='horizontal' gap={1}>

        
        <Link to={`/${note.id}/edit`}>
        
            <Button >
                Edit
            </Button>
        </Link>
        <Button onClick={()=>deleteNote(note.id)} variant='outline-danger'>
            Delete

        </Button>
        <Link to="..">
        
        <Button variant='outline-secondary'>
            Back
        </Button>
    </Link>
    </Stack>


    </Col>
  </Row>
  <ReactMarkdown>{note.markdown}</ReactMarkdown>
  </>
  )
}
