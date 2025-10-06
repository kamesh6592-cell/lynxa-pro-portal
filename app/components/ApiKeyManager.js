// components/ApiKeyManager.js
import { useState, useEffect } from 'react'
import Playground from './Playground'
import CurlCommand from './CurlCommand'

export default function ApiKeyManager({ userId, userEmail }) {
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch user's keys when the component mounts
  useEffect(() => {
    fetch('/api/user/keys') // This will call our backend API
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch keys')
        return res.json()
      })
      .then(data => {
        setKeys(data.keys || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleGenerateKey = async () => {
    setError('')
    const res = await fetch('/api/keys/generate', { // This calls our existing backend endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, userId })
    })
    const data = await res.json()
    if (data.success) {
      alert(`New Key Generated!\n\n${data.apiKey}\n\nKeep it safe!`)
      // Refetch keys to show the new one in the list
      window.location.reload()
    } else {
      setError('Error: ' + data.error)
    }
  }

  if (loading) return <p>Loading your API keys...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  const activeKey = keys.find(k => !k.revoked)

  return (
    <div>
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Your API Keys</h2>
          <button onClick={handleGenerateKey} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Generate New Key
          </button>
        </div>
        {keys.length === 0 ? (
          <p>You haven't generated any API keys yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '0.5rem' }}>API Key</th>
                <th style={{ padding: '0.5rem' }}>Created</th>
                <th style={{ padding: '0.5rem' }}>Expires</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {keys.map(key => (
                <tr key={key.api_key} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>
                    {key.api_key.substring(0, 20)}...
                  </td>
                  <td style={{ padding: '0.5rem' }}>{new Date(key.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '0.5rem' }}>{new Date(key.expires).toLocaleDateString()}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ color: key.revoked ? 'red' : 'green', fontWeight: 'bold' }}>
                      {key.revoked ? 'Revoked' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {activeKey && (
        <>
          <hr style={{ margin: '2rem 0' }} />
          <Playground apiKey={activeKey.api_key} />
          <CurlCommand apiKey={activeKey.api_key} />
        </>
      )}
    </div>
  )
}
