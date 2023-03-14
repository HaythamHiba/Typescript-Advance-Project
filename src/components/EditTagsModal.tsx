import React from 'react'
import { Button, Col, Form, FormControl, Modal, ModalBody, ModalHeader, ModalTitle, Row, Stack } from 'react-bootstrap'
import { Tag } from '../App'

type Props = {
    openModal:boolean
    tags:Tag[]
    handleClose:()=>void
    deleteTag:(id:string)=>void
    changeTagLabel:(id:string,label:string)=>void
}

export default function EditTagsModal({openModal,tags,handleClose,deleteTag,changeTagLabel}: Props) {

   

  return (
    <Modal onHide={handleClose} show={openModal}>
        <ModalHeader  closeButton > 
            <ModalTitle>
                Edit Tags
            </ModalTitle>
        </ModalHeader>
        <ModalBody>
            <Form>
                
                    <Stack gap={2}>
                        {
                        
                           tags.map(tag=>
                            <Row key={tag.id}>
                                <Col>
                                    <FormControl onChange={(e)=>changeTagLabel(tag.id,e.target.value)} type='text' value={tag.label}/>
                                </Col>

                                <Col xs="auto">
                                    <Button onClick={()=>deleteTag(tag.id)} variant="outline-danger">&times;</Button>
                                </Col>
                            </Row>      
                            )
                        }
                    </Stack>
                
            </Form>
        </ModalBody>
    </Modal>
  )
}