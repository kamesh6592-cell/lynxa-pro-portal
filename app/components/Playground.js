// components/Playground.js
import { useState } from 'react'

export default function Playground({ apiKey }) {
  const [prompt, setPrompt] = useState('Hello, who are you?')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    setResponse('')
    try {
      const res = await fetch('/api/lynxa', { // This calls our existing backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ message: prompt })
      })
      const data = await res.json()
      if (data.success) {
        setResponse(data.response)
      } else {
        setResponse('Error: ' + data.error)
      }
    } catch (error) {
      setResponse('An unexpected error occurred.')
    }
    setLoading(false)
  }

  return (
    <section style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>API Playground</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleRun} disabled={loading || !prompt.trim()}>
        {loading ? 'Running...' : 'Run'}
      </button>
      {response && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </section>
  )
}
