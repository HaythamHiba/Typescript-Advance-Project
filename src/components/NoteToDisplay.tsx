import React from 'react'
import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Note } from '../App'
import styles from './NoteToDisplay.module.css'

type NoteProps={
note:Note
}

export default function NoteToDisplay({note}:NoteProps) {
  return (
    <Card as={Link} to={`/${note.id}`} className={`h-100 text-reset text-decoration-none  ${styles.card}`}>
     
        <Card.Body>
          <Stack gap={2} className="align-items-center">
          <h2>
            {note.title}
          </h2>
            {note.tags.length>0 && <Stack className='align-items-center justify-content-center flex-wrap' gap={1} direction="horizontal">
                {
                  note.tags.map(tag=>
                  <Badge className='text-truncate'   key={tag.id}>
                    
                  
                      {tag.label}
                    
                    </Badge>)
                }
              </Stack>}
          </Stack>
        </Card.Body>
    </Card>
  )
}
