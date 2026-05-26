import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@supabas../supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export function useRpcInfiniteQuery(fnName, params = {}, pageSize = 20) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(null)

  const activeRequest = useRef(false)

  const fetchData = useCallback(async () => {
    if (loading || !hasMore || activeRequest.current) return
    setLoading(true)
    setError(null)
    activeRequest.current = true

    try {
      const { data: result, error: rpcError } = await supabase.rpc(fnName, {
        ...params,
        p_limit: pageSize,
        p_offset: page * pageSize
      })

      if (rpcError) throw rpcError

      if (!result || result.length === 0) {
        setHasMore(false)
        return []
      } else {
        setData(prev => [...prev, ...result])
        setPage(prev => prev + 1)
        if (result.total_count) setTotalCount(result.total_count)
        return result
      }
    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
      activeRequest.current = false
    }
  }, [fnName, JSON.stringify(params), page, pageSize, hasMore, loading])

  useEffect(() => {
    setData([])
    setPage(0)
    setHasMore(true)
    setTotalCount(null)
  }, [JSON.stringify(params)])

  return { data, loading, error, hasMore, fetchData, totalCount }
}
