import { useEffect, useState } from 'react'

const isAttached = (src: string) => {
  const scripts = document.querySelectorAll<HTMLScriptElement>('SCRIPT')
  for (let i=0; i<scripts.length; i+=1) {
    const node = scripts[i]
    if (node.src === src) {
      return true
    }
  }

  return false
}


export const useScript = (url: string, onLoaded?: () => void) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<ErrorEvent | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isAttached(url)) {
        const script = document.createElement('script')

        script.addEventListener('load', () => setLoaded(true), {once: true})
        script.addEventListener('error', setError, {once: true})
        script.src = url

        document.body.appendChild(script)
      } else {
        setLoaded(true)
      }
    }
  }, [url])

  return {loaded, error}
}