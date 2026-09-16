import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ContactSubmissionRecord } from '../../services/types';

interface ContactSubmissionsTableProps {
  submissions: ContactSubmissionRecord[];
}

export function ContactSubmissionsTable({ submissions }: ContactSubmissionsTableProps) {
  if (submissions.length === 0) {
    return <Typography color="text.secondary">No contact submissions yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }}>Submitted</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{new Date(s.createdAt).toLocaleString()}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.phone}</TableCell>
              <TableCell sx={{ maxWidth: 320 }}>{s.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
