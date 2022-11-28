import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CrudTable from './views/CrudAPI/components/CrudTable';

const Home = lazy(() => import('./views/Home/Home'));
const CrudAPI = lazy(() => import('./views/CrudAPI/CrudAPI'));
const SongSearch = lazy(() => import('./views/SongSearch/SongSearch'));
const Error404 = lazy(() => import('./views/Error404/Error404'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud-api/*" element={<CrudAPI />} />
          <Route path="/song-search" element={<SongSearch />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
