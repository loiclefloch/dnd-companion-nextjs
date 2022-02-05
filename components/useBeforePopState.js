import { useEffect } from 'react';
import { useRouter } from 'next/router'

const isBrowser = typeof window !== "undefined";

function useBeforePopState(cb) {
  const router = useRouter()

  useEffect(() => {
		if (isBrowser) {
			router.beforePopState(() => {
				const allowRedirect = cb()
				return allowRedirect
			})
		}
   
		return () => {
			router.beforePopState(() => {
				return true
			})
		}
  }, [ history ])

  return {
  }
}

export default useBeforePopState