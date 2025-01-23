import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const papers = [
  {
    id: 1,
    title: "Advancements in Natural Language Processing",
    conference: "AI and Machine Learning 2024",
    status: "Accepted",
  },
  {
    id: 2,
    title: "Secure Coding Practices for Web Applications",
    conference: "Web Development Summit",
    status: "Under Review",
  },
  {
    id: 3,
    title: "Blockchain in Cybersecurity",
    conference: "Cybersecurity Conference",
    status: "Rejected",
  },
]

export default function PaperList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paper Title</TableHead>
          <TableHead>Conference</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {papers.map((paper) => (
          <TableRow key={paper.id}>
            <TableCell className="font-medium">{paper.title}</TableCell>
            <TableCell>{paper.conference}</TableCell>
            <TableCell>
              <Badge
                variant={
                  paper.status === "Accepted" ? "default" : paper.status === "Rejected" ? "destructive" : "secondary"
                }
              >
                {paper.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

