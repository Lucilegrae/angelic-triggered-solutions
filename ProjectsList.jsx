import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './ProjectsList.css'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default function ProjectsList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('Projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()

    // Real-time subscription
    const subscription = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Projects' },
        (payload) => {
          console.log('Project change received!', payload)

          if (payload.eventType === 'INSERT') {
            setProjects((prev) => [
              { ...payload.new, animate: true },
              ...prev
            ])
          }
          if (payload.eventType === 'UPDATE') {
            setProjects((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? { ...payload.new, animate: true } : p
              )
            )
          }
          if (payload.eventType === 'DELETE') {
            setProjects((prev) =>
              prev.filter((p) => p.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  if (loading) return <p>Loading projects...</p>

  return (
    <ul className="projects-list">
      {projects.map((p, i) => (
        <li key={i}>
          <strong>{p.name || 'Untitled Project'}</strong>
          <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '8px' }}>
            {new Date(p.created_at).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  )
}
