import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Link } from 'lucide-react'

const mockTracks = [
  { id: 1, name: 'AI and Machine Learning', submissions: 15, link: 'https://example.com/ai-ml' },
  { id: 2, name: 'Web Technologies', submissions: 22, link: 'https://example.com/web-tech' },
  { id: 3, name: 'Cybersecurity', submissions: 18, link: 'https://example.com/cybersecurity' },
]

export default function TrackManagement() {
  const [tracks, setTracks] = useState(mockTracks)
  const [newTrack, setNewTrack] = useState({ name: '' })

  const addTrack = () => {
    const link = `https://example.com/${newTrack.name.toLowerCase().replace(/\s+/g, '-')}`
    setTracks([...tracks, { ...newTrack, id: tracks.length + 1, submissions: 0, link }])
    setNewTrack({ name: '' })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Track Management</h2>
      <div className="mb-6 flex space-x-4">
        <Input
          placeholder="Track Name"
          value={newTrack.name}
          onChange={(e) => setNewTrack({ ...newTrack, name: e.target.value })}
        />
        <Button onClick={addTrack}>
          <Plus className="mr-2 h-4 w-4" /> Add Track
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Track Name</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Submission Link</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell>{track.name}</TableCell>
              <TableCell>{track.submissions}</TableCell>
              <TableCell>
                <a href={track.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                  <Link className="mr-2 h-4 w-4" />
                  {track.link}
                </a>
              </TableCell>
              <TableCell>
                <Button variant="ghost">Edit</Button>
                <Button variant="ghost" className="text-red-600">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

