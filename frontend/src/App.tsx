import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './ui/layout/Layout.tsx';
import Home from './ui/pages/Home/Home.tsx';
import AccommodationsPage from './ui/pages/AccommodationsPage/AccommodationsPage.tsx';
import AccommodationDetailsPage from './ui/pages/AccommodationDetailsPage/AccommodationDetailsPage.tsx';
import HostsPage from './ui/pages/HostsPage/HostsPage.tsx';
import HostDetailsPage from './ui/pages/HostDetailsPage/HostDetailsPage.tsx';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage.tsx';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage.tsx';
import UsersPage from './ui/pages/UsersPage/UsersPage.tsx';
import UserDetailsPage from './ui/pages/UserDetailsPage/UserDetailsPage.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/accommodations/:id" element={<AccommodationDetailsPage />} />
        <Route path="/hosts" element={<HostsPage />} />
        <Route path="/hosts/:id" element={<HostDetailsPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/countries/:id" element={<CountryDetailsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
