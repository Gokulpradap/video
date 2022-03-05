import React from 'react'
import { CommentArr } from './Static'

function Comments() {
  const updated = CommentArr.slice(0,20)
  return (  
    <div className='commentLine'>
        {updated.map((comment) =>(
          <>
          <h5>{comment.name}</h5>
          <p>{comment.comment}</p>
          </>
        ) )}
    </div>
  )
}

export default Comments