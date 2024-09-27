// router.ts
import ConfiguracionesPage from './pages/configuraciones';
import Puntajes from './pages/Puntajes';
import UserProfile from './pages/perfil';
import IndexPage from './pages/index';
import VerSalas from './pages/ver-salas';
import ReactDOM from 'react-dom';


type Routes = {
  [key: string]: () => JSX.Element; // Adjust according to what your components return
};

const routes: Routes = {
  '/': IndexPage,
  '/configuraciones': ConfiguracionesPage,
  '/puntajes': Puntajes,
  '/perfil': UserProfile,
  '/ver-salas': VerSalas,
};

export const navigate = (path: string) => {
  window.history.pushState({}, path, window.location.origin + path);
  renderPage(path);
};

export const renderPage = (path: string) => {
  const root = document.getElementById('root');

  if (!root) {
    console.error("Root element not found");
    return; // or handle it as appropriate
  }

  const page = routes[path] || IndexPage; // Fallback to IndexPage if not found
  root.innerHTML = ''; // Clear the root element
  ReactDOM.render(page(), root); // Render the new page component
};

window.onpopstate = () => {
  renderPage(window.location.pathname);
};
