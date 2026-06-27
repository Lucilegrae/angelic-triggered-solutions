import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './StakeholdersList.css'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default function StakeholdersList() {
  const [stakeholders, setStakeholders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    async function fetchStakeholders() {
      const { data, error } = await supabase
        .from('Stakeholders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching stakeholders:', error)
      } else {
        setStakeholders(data)
      }
      setLoading(false)
    }

    fetchStakeholders()

    // Real-time subscription
    const subscription = supabase
      .channel('stakeholders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Stakeholders' },
        (payload) => {
          console.log('Stakeholder change received!', payload)

          if (payload.eventType === 'INSERT') {
            setStakeholders((prev) => [
              { ...payload.new, animate: true },
              ...prev
            ])
          }
          if (payload.eventType === 'UPDATE') {
            setStakeholders((prev) =>
              prev.map((s) =>
                s.id === payload.new.id ? { ...payload.new, animate: true } : s
              )
            )
          }
          if (payload.eventType === 'DELETE') {
            setStakeholders((prev) =>
              prev.filter((s) => s.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  if (loading) return <p>Loading stakeholders...</p>

  return (
    <ul className="stakeholders-list">
      {stakeholders.map((s, i) => (
        <li key={i}>
          <strong>{s.name || 'Unnamed Stakeholder'}</strong>
          <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '8px' }}>
            {new Date(s.created_at).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  )
}
