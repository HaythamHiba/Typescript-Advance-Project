import React from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Note ,Tag} from '../App'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import NoteToDisplay from '../components/NoteToDisplay'

type MainPageProps={
    notes:Note[]
    tags:Tag[]
}
export default function MainPage({notes,tags}:MainPageProps) {
    const [selectedTags,setSelectedTags]=React.useState<Tag[]>([]);
    const [title,setTitle]=React.useState("");

    const filteredNotes=React.useMemo(()=>notes.filter(note=>{
        return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
        && (selectedTags.length === 0 || selectedTags.every(seltag=>note.tags.some(tag=>tag.id===seltag.id)))
    }),[notes,title,selectedTags])
  return (
    <Container className="m-3">
        <Row className='align-items-center mb-4'>
            <Col>
                <h1>
                    Main Page
                </h1>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction='horizontal'>
                    <Link to="new">
                    
                    <Button variant='primary'>
                        Create
                    </Button>
                    </Link>
                    
                    <Button variant='outline-secondary'>
                        Edit Tags
                    </Button>
                    
                </Stack>
            </Col>
        </Row>
      
            <Form className='mb-4'>
                <Row>
                    <Col>
                    
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title} onChange={e=>setTitle(e.target.value)}/>
                </Form.Group>
                
                    </Col>
                    <Col>
                    
                        <Form.Group controlId='selectedtags'>
                    <Form.Label>Tags</Form.Label>
                        <Select
                        isMulti
                        value={selectedTags.map(tag=>{return{label:tag.label,value:tag.id}})}
                        onChange={tags=>{setSelectedTags(tags.map(tag=>{return{label:tag.label,id:tag.value}}))}}
                    
                        options={tags.map(opt=>{return {label:opt.label,value:opt.id}})}
                    
                        />
                    </Form.Group>
                
                    </Col>
                </Row>
       
              
            </Form>

            <Row xl="4" lg="3" md="2" sm="2" xs="1">
                {
                    filteredNotes.map(note=><Col className='m-1' key={note.id}>
                    <NoteToDisplay note={note}/>
                    </Col>)
                }
                
            </Row>
            
     
        
        
    </Container>
  )
}
