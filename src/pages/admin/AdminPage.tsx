import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../auth/useAuth';
import { getContactSubmissions, getEnrollmentInquiries, getStaff } from '../../services/adminService';
import type { ContactSubmissionRecord, EnrollmentInquiryRecord, StaffRecord } from '../../services/types';
import { ContactSubmissionsTable } from '../../components/admin/ContactSubmissionsTable';
import { EnrollmentInquiriesTable } from '../../components/admin/EnrollmentInquiriesTable';
import { StaffTable } from '../../components/admin/StaffTable';
import { AddStaffForm } from '../../components/admin/AddStaffForm';

const tabs = ['Contact Submissions', 'Enrollment Inquiries', 'Staff'] as const;

export function AdminPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState(0);

  const [contacts, setContacts] = useState<ContactSubmissionRecord[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentInquiryRecord[]>([]);
  const [staff, setStaff] = useState<StaffRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshStaff = useCallback(async () => {
    if (!token) return;
    const staffResult = await getStaff(token);
    if (staffResult.success && staffResult.data) setStaff(staffResult.data);
  }, [token]);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      setError(null);

      const [contactsResult, enrollmentsResult, staffResult] = await Promise.all([
        getContactSubmissions(token!),
        getEnrollmentInquiries(token!),
        getStaff(token!),
      ]);

      if (cancelled) return;

      if (contactsResult.success && contactsResult.data) setContacts(contactsResult.data);
      if (enrollmentsResult.success && enrollmentsResult.data) setEnrollments(enrollmentsResult.data);
      if (staffResult.success && staffResult.data) setStaff(staffResult.data);

      if (!contactsResult.success || !enrollmentsResult.success || !staffResult.success) {
        setError('Some admin data failed to load. Try refreshing the page.');
      }
      setLoading(false);
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 3 }}>
        {tabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {tab === 0 && <ContactSubmissionsTable submissions={contacts} />}
          {tab === 1 && <EnrollmentInquiriesTable inquiries={enrollments} />}
          {tab === 2 && (
            <Stack spacing={3}>
              <StaffTable staff={staff} />
              <Divider />
              <AddStaffForm onCreated={refreshStaff} />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
}
