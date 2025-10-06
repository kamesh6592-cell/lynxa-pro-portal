// components/CurlCommand.js
export default function CurlCommand({ apiKey }) {
  const command = `curl -X POST https://lynxa-pro-backend.vercel.app/api/lynxa \\
 -H "Content-Type: application/json" \\
 -H "Authorization: Bearer ${apiKey}" \\
 -d '{"message": "Hello, who are you?"}'`

  return (
    <section style={{ marginTop: '2rem' }}>
      <h4>Try it with cURL:</h4>
      <pre style={{ background: '#2d2d2d', color: '#f8f8f2', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {command}
      </pre>
    </section>
  )
}
