import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
