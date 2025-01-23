import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const conferences = [
  { id: 1, name: "AI and Machine Learning 2024", role: "Admin" },
  { id: 2, name: "Web Development Summit", role: "Author" },
  { id: 3, name: "Cybersecurity Conference", role: "Reviewer" },
]

export default function ConferenceList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Conference Name</TableHead>
          <TableHead>Your Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conferences.map((conference) => (
          <TableRow key={conference.id}>
            <TableCell className="font-medium">{conference.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{conference.role}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

