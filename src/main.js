// Este es el punto de entrada de tu aplicacion

import { home } from './pages/home';
import { register } from './pages/register';
import { wall } from './pages/wall';
import { addRoutes, onNavigate } from './router/index.js';

addRoutes({
  '/': home,
  '/register': register,
  '/wall': wall,
});

window.onload = () => {
  onNavigate(window.location.pathname);
};

window.onpopstate = () => {
  onNavigate(window.location.pathname);
};
