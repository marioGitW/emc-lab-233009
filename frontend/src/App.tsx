import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './ui/layout/Layout.tsx';
import Home from './ui/pages/Home/Home.tsx';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage.tsx';
import AccommodationDetailsPage from './ui/pages/AccommodationDetailsPage/AccommodationDetailsPage.tsx';
import HostsPage from './ui/pages/HostsPage/HostsPage.tsx';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/accommodations/:id" element={<AccommodationDetailsPage />} />
        <Route path="/hosts" element={<HostsPage />} />
        <Route path="/countries" element={<CountriesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
