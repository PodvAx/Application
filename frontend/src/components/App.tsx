import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useError } from '../hooks/useError';
import ErrorMessage from './ErrorMessage';

function App() {
  const { error } = useError();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />

      {error && <ErrorMessage />}
    </div>
  );
}

export default App;
