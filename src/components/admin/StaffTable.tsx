import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { StaffRecord } from '../../services/types';

interface StaffTableProps {
  staff: StaffRecord[];
}

export function StaffTable({ staff }: StaffTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }}>Username</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Display Name</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.username}</TableCell>
              <TableCell>{s.displayName}</TableCell>
              <TableCell>{new Date(s.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
