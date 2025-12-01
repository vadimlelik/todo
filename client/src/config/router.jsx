import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute';
import { Post } from '../Post';
import { Auth } from '../Auth';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/post',
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    ),
  },
  {
    path: '/',
    element: <h1>Main</h1>,
  },
]);
