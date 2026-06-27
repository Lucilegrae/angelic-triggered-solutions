import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './AffirmationsList.css' // aura animations

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default function AffirmationsList() {
  const [affirmations, setAffirmations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    async function fetchAffirmations() {
      const { data, error } = await supabase
        .from('Affirmations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching affirmations:', error)
      } else {
        setAffirmations(data)
      }
      setLoading(false)
    }

    fetchAffirmations()

    // Real-time subscription
    const subscription = supabase
      .channel('affirmations-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Affirmations' },
        (payload) => {
          console.log('Affirmation change received!', payload)

          if (payload.eventType === 'INSERT') {
            setAffirmations((prev) => [
              { ...payload.new, animate: true },
              ...prev
            ])
          }
          if (payload.eventType === 'UPDATE') {
            setAffirmations((prev) =>
              prev.map((a) =>
                a.id === payload.new.id ? { ...payload.new, animate: true } : a
              )
            )
          }
          if (payload.eventType === 'DELETE') {
            setAffirmations((prev) =>
              prev.filter((a) => a.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  if (loading) return <p>Loading affirmations...</p>

  return (
    <div
      style={{
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        justifyContent: 'center'
      }}
    >
      {affirmations.map((a) => (
        <div
          key={a.id}
          className={`glyph-card ${a.animate ? 'aura-fade' : ''}`}
        >
          <h2 className="slogan-arc aura-heading">{a.slogan}</h2>
          {a.ceremonial_arc && (
            <p style={{ fontStyle: 'italic', opacity: 0.8 }}>
              Arc: {a.ceremonial_arc}
            </p>
          )}
          <p style={{ fontSize: '12px', opacity: 0.7 }}>
            {new Date(a.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
