import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// Supabase glyphs
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const channel = supabase
  .channel(process.env.CHANNEL_NAME || 'projects-changes')

  // Database changes listener
  .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, payload => {
    console.log('♦ Glyph received ♦', payload)
  })

  // Broadcast listener
  .on('broadcast', { event: 'dashboard_update' }, payload => {
    console.log('♦ Aura broadcast ♦', payload)
  })

// Seal covenant and send aura once subscribed
channel.subscribe(status => {
  console.log('♦ Subscription status ♦', status)

  if (status === 'SUBSCRIBED') {
    // First aura message
    channel.send({
      type: 'broadcast',
      event: 'dashboard_update',
      payload: { message: 'Legitimacy panel refreshed' }
    })

    // Second aura message
    channel.send({
      type: 'broadcast',
      event: 'dashboard_update',
      payload: { message: 'Stakeholder covenant affirmed' }
    })
  }
})
