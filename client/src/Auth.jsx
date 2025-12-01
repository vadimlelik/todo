import React from 'react';
import { useAuth } from './provider/auth';

export const Auth = () => {
  const { register, login } = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          register({
            email: 'vdim@mail.ru',
            username: 'Vadim',
            password: '123456',
          });
        }}
      >
        Регистрация
      </button>
      <button
        onClick={() => {
          login({
            email: 'vdim@mail.ru',
            password: '123456',
          });
        }}
      >
        Login
      </button>
    </div>
  );
};
