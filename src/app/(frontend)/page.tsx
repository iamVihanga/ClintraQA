import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Homepage({}: Props) {
  return (
    <div>
      <p className="text-3xl font-heading">Homepage</p>
      <Button asChild>
        <Link href="/admin">Admin Dashboard</Link>
      </Button>
    </div>
  )
}
