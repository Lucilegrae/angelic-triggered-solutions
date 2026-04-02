import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default function AddProjectForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [aura, setAura] = useState('')
  const [pdfLink, setPdfLink] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const { data, error } = await supabase
      .from('Projects')
      .insert([
        {
          title,
          description,
          aura_overlay: aura,
          pdf_export_link: pdfLink
        }
      ])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Project added successfully!')
      setTitle('')
      setDescription('')
      setAura('')
      setPdfLink('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Aura Overlay"
        value={aura}
        onChange={(e) => setAura(e.target.value)}
      />
      <input
        type="text"
        placeholder="PDF Export Link"
        value={pdfLink}
        onChange={(e) => setPdfLink(e.target.value)}
      />
      <button type="submit">Add Project</button>
      {message && <p>{message}</p>}
    </form>
  )
}
