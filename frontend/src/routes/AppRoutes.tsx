import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from '../components/App';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { MyEventsPage } from '../pages/MyEventsPage';
import { CreateEventPage } from '../pages/CreateEventPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="create-event" element={<CreateEventPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="events" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
