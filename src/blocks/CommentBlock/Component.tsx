'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Comment, Post, User } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { useEffect, useState } from 'react'
import { ImageMedia } from '@/components/Media/ImageMedia'

type Props = {
  className?: string
  post: Post
  user: User
}

type CommentItem = {
  comment: string
  author: {
    id: string
    email: string
    username: string
  }
  timeStamp: string
  id: string
}

export const CommentBlock: React.FC<Props> = (props) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<CommentItem[]>([])
  const [error, setError] = useState('')
  const { className, post, user } = props

  // Fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const req = await fetch(`${getServerSideURL()}/api/comments`)
        if (!req.ok) {
          throw new Error('Failed to fetch comments')
        }
        const data = await req.json()
        // Find comments for the current post and extract them
        const postDoc = data.docs.find((doc: any) => doc.post.id === post.id)
        const postComments = postDoc?.comments || []
        setComments(postComments)
      } catch (err) {
        console.error(err)
        setError('An error occurred while fetching comments.')
      }
    }
    fetchComments()
  }, [post.id])

  const createComment = async () => {
    if (!comment.trim()) {
      setError('Comment cannot be empty.')
      return
    }

    try {
      const req = await fetch(`${getServerSideURL()}/api/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: post.id,
          comments: [
            {
              comment: comment,
              author: user.id,
              timeStamp: new Date().toISOString(),
            },
          ],
        }),
      })

      if (!req.ok) {
        throw new Error('Failed to create comment')
      }

      const data = await req.json()

      // Handle the new comment based on the actual response structure
      const newComment = {
        comment: comment,
        author: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        timeStamp: new Date().toISOString(),
        id: data.id, // Assuming the response includes an ID
      }

      setComments((prevComments) => [...prevComments, newComment])
      setComment('') // Clear the textarea
      setError('') // Clear any previous error
    } catch (err) {
      console.error(err)
      setError('An error occurred while submitting your comment.')
    }
  }

  return (
    <section className={cn(className)}>
      <h2>Comments</h2>
      <div className="flex flex-col items-end gap-2">
        <Textarea
          placeholder={'Write your comment here...'}
          onChange={(e) => {
            setComment(e.target.value)
            setError('') // Clear error on input change
          }}
          value={comment}
          className="w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button size={'sm'} variant={'outline'} onClick={createComment}>
          Submit
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {comments.map((commentItem) => (
          <div
            key={commentItem.id}
            className="bg-muted p-5 rounded-lg border-b border-gray-200 py-4 last:border-b-0"
          >
            <p className="text-sm font-light mb-2">{commentItem.comment}</p>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>{commentItem.author.username}</span>
              <span>•</span>
              <span>{formatDateTime(commentItem.timeStamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
