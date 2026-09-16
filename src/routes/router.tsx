import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { AdminLayout } from '../layout/AdminLayout';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ProgramsPage } from '../pages/ProgramsPage';
import { GalleryPage } from '../pages/GalleryPage';
import { StaffPage } from '../pages/StaffPage';
import { TuitionPage } from '../pages/TuitionPage';
import { EnrollmentPage } from '../pages/EnrollmentPage';
import { ContactPage } from '../pages/ContactPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/programs', element: <ProgramsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/staff', element: <StaffPage /> },
      { path: '/tuition', element: <TuitionPage /> },
      { path: '/enrollment', element: <EnrollmentPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin/login', element: <AdminLoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: '/admin', element: <AdminPage /> }],
      },
    ],
  },
]);
