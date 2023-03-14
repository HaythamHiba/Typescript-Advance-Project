import { useRef, useState } from 'react';
import {Form,Stack,Row,Col,Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from "react-select/creatable";
import {  Note, NoteData, Tag } from '../App';
import {v4 as uuidV4} from 'uuid'

type NoteFormProps={
  submitForm:(data:NoteData)=>void
  createTag:(data:Tag)=>void
  availableOptions:Tag[]
  note?:NoteData | null
  
}

export default function NoteForm({submitForm,note,createTag,availableOptions}:NoteFormProps) {


  const titleRef=useRef<HTMLInputElement>(null);
  const markdownRef=useRef<HTMLTextAreaElement>(null);
  const [selectedTags,setSelectedTags]=useState<Tag[]>(note?.tags || []);
  const navigate=useNavigate();
  function handleSubmit(e:any){
    e.preventDefault();
    submitForm({
      title:titleRef.current!.value,
      markdown:markdownRef.current!.value,
      tags:selectedTags
    })

    navigate("..");

  }

  return (
    <Form onSubmit={handleSubmit}>

      <Stack gap={2}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={note?.title || ""} ref={titleRef} required/>
            </Form.Group>
          </Col>
          <Col>
           <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                isMulti
                value={selectedTags.map(tag=>{return{label:tag.label,value:tag.id}})}
                onChange={tags=>{setSelectedTags(tags.map(tag=>{return{label:tag.label,id:tag.value}}))}}
                onCreateOption={label=>{
                    createTag({label:label,id:uuidV4()})
                }}
                options={availableOptions.map(opt=>{return {label:opt.label,value:opt.id}})}
              
                 />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
              <Form.Label>Mark Down</Form.Label>
              <Form.Control ref={markdownRef} defaultValue={note?.markdown|| ""} required as="textarea" rows={15}/>
            </Form.Group>
      </Stack>
      <Stack direction='horizontal' gap={2} className="justify-content-end my-5">

      <Button type='submit' variant='primary'>Save</Button>
      <Link to="..">
      <Button type="button" variant='outline-secondary'>Cancle</Button>
      
      </Link>
      </Stack>

    </Form>
    
    )
}
