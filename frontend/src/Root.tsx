import { AuthProvider } from './context/auth/AuthProvider';
import { ErrorProvider } from './context/error/ErrorProvider';
import AppRoutes from './routes/AppRoutes';

export default function Root() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorProvider>
  );
}
