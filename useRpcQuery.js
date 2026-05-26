import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

/**
 * Custom React hook for Supabase RPC queries
 * @param {string} fnName - RPC function name
 * @param {object} params - Parameters for the RPC call
 * @param {number} pageSize - Number of rows per page
 */
export function useRpcQuery(fnName, params = {}, pageSize = 20) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const { data: result, error: rpcError } = await supabase.rpc(fnName, {
          ...params,
          p_limit: pageSize,
          p_offset: page * pageSize
        })

        if (rpcError) throw rpcError
        if (isMounted) setData(result || [])
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [fnName, JSON.stringify(params), page, pageSize])

  return { data, loading, error, page, setPage }
}
