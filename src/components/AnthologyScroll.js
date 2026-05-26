import React, { useRef, useEffect, useState } from 'react'
import { useRpcInfiniteQuery } from '../hooks/useRpcInfiniteQuery'
import { useProgressRing } from '../hooks/useProgressRing'
import { supabase } from '.../supabaseClient'
import AuditExportButton from './AuditExportButton'
import './scrollAnimations.css'

const branchSounds = {
  Banking: '/sounds/chime.mp3',
  Veterans: '/sounds/drum.mp3',
  Cement: '/sounds/resonance.mp3',
  Steel: '/sounds/clang.mp3',
  Government: '/sounds/horn.mp3'
}

export default function AnthologyScroll() {
  // lineage scroll state
  const { data, loading, error, hasMore, fetchData, totalCount } = useRpcInfiniteQuery(
    'hierarchical_cte_query',
    {
      p_sector_name: 'Banking',
      p_metric_name: 'Net Profit',
      p_start_date: '2025-01-01',
      p_end_date: '2026-12-31',
      p_institution_id: '5adc8146-9758-45e2-88cd-82d8fb2d2277'
    },
    15
  )

  const loaderRef = useRef(null)
  const [pulse, setPulse] = useState(false)
  const { progress, circumference, radius } = useProgressRing(data.length, totalCount, 60)

  // audit records state
  const [auditRecords, setAuditRecords] = useState([])

  useEffect(() => {
    // fetch audit trail once
    const fetchAudit = async () => {
      const { data, error } = await supabase
        .from('lineage_audit')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setAuditRecords(data)
    }
    fetchAudit()
  }, [])

  // infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchData().then(newEntries => {
            if (newEntries && newEntries.length > 0) {
              const lastEntry = newEntries[newEntries.length - 1]
              const soundPath = branchSounds[lastEntry.branch] || branchSounds.Banking
              const audio = new Audio(soundPath)
              audio.play().catch(() => console.warn('Audio blocked until user interaction'))

              setPulse(true)
              setTimeout(() => setPulse(false), 1000)
            }
          })
        }
      },
      { threshold: 1.0 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [fetchData, hasMore, loading])

  return (
    <div className={`scroll-container ${data.length > 0 ? data[data.length - 1].branch : ''}`}>
      <h2>Anthology Scroll</h2>

      {/* Golden Star Crest with progress ring */}
      <div className="golden-star-container">
        <svg width={140} height={140}>
          <circle
            stroke="gold"
            fill="transparent"
            strokeWidth="8"
            r={radius}
            cx={70}
            cy={70}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="28"
            fill="gold"
            className={pulse ? 'pulse' : ''}
          >
            ★
          </text>
        </svg>
        <p>{data.length} / {totalCount || '∞'} entries</p>
      </div>

      {/* lineage entries */}
      <ul>
        {data.map(row => (
          <li key={row.id} className="fade-in-aura">
            <span className="metric">{row.metric_value}</span>
            <span className="date">({row.date})</span>
            <span className="branch">[{row.branch}]</span>
          </li>
        ))}
      </ul>
      {loading && <p>Loading more…</p>}
      {error && <p>Error: {error}</p>}
      <div ref={loaderRef} />

      {/* Export audit scroll */}
      <AuditExportButton records={auditRecords} />
    </div>
  )
}
