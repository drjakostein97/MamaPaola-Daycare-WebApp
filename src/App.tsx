import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { theme } from './theme';
import { router } from './routes/router';
import { AuthProvider } from './auth/AuthProvider';
import i18n from './i18n';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
