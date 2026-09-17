import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthContext } from './AuthContext';
import { createAuthValue } from '../test/test-utils';

function renderProtectedAt(route: string, isAuthenticated: boolean) {
  return render(
    <AuthContext.Provider value={createAuthValue({ isAuthenticated })}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/admin/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('redirects to /admin/login when not authenticated', () => {
    renderProtectedAt('/admin', false);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders the nested route content when authenticated', () => {
    renderProtectedAt('/admin', true);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
