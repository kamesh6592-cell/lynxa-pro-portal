// app/dashboard/page.js
"use client"; // <-- ADD THIS LINE

import { useAuth, useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ApiKeyManager from '@/components/ApiKeyManager'

export default function Dashboard() {
  // ... rest of the code is the same
  const { isSignedIn, userId } = useAuth()
  const { user } = useUser()

  if (!isSignedIn) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Please Sign In</h1>
        <p>You must be signed in to view your dashboard.</p>
        <Link href="/sign-in">Sign In</Link>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1>Welcome, {user.firstName || user.username}!</h1>
        <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
      </header>
      
      <main>
        <ApiKeyManager userId={userId} userEmail={user.primaryEmailAddress.emailAddress} />
      </main>
    </div>
  )
}
