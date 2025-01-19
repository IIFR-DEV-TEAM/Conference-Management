import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export default function EmailInvitation() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendInvitation = async (e:Event) => {
    e.preventDefault()
    // Here you would typically send the invitation via an API
    console.log('Sending invitation to:', email)
    console.log('Message:', message)
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${email}`,
    })
    
    setEmail('')
    setMessage('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Email Invitation</h2>
      <form onSubmit={sendInvitation} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Invitation Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>
        <Button type="submit">Send Invitation</Button>
      </form>
    </div>
  )
}

