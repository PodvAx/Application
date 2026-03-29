import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../components/App';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { MyEventsPage } from '../pages/MyEventsPage';
import { CreateEventPage } from '../pages/CreateEventPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import ActivationPage from '../pages/ActivationPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import ProfilePage from '../pages/ProfilePage';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="activate" element={<ActivationPage />} />
          <Route path="my-events" element={<MyEventsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create-event" element={<CreateEventPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="events" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
