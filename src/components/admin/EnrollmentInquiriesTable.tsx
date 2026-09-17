import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { EnrollmentInquiryRecord } from '../../services/types';

interface EnrollmentInquiriesTableProps {
  inquiries: EnrollmentInquiryRecord[];
}

export function EnrollmentInquiriesTable({ inquiries }: EnrollmentInquiriesTableProps) {
  if (inquiries.length === 0) {
    return <Typography color="text.secondary">No enrollment inquiries yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }}>Submitted</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Parent</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Children</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Preferred Start</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{new Date(i.createdAt).toLocaleString()}</TableCell>
              <TableCell>{i.parentName}</TableCell>
              <TableCell>{i.email}</TableCell>
              <TableCell>{i.phone}</TableCell>
              <TableCell>{i.children.map((c) => c.age).join(', ')}</TableCell>
              <TableCell>{i.preferredStartDate}</TableCell>
              <TableCell sx={{ maxWidth: 240 }}>{i.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
