import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const landingPage = () => {
  return (
    <div>
      <p>(unprotected)</p>
      <Link href="/dashboard">
        <Button>
          Go to dashboard
        </Button>
      </Link>
    </div>
  )
}

export default landingPage