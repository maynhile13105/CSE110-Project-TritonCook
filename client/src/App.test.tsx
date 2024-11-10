import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginHomepage from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import CreateAccountPage from './views/CreateAccountPage';
import { MemoryRouter, Routes } from 'react-router-dom';

test('renders login page', () => {
  render(
    <MemoryRouter >
      <LoginHomepage />
    </MemoryRouter >);

  const TritonCook = screen.getByText("TritonCook");
  expect(TritonCook).toBeInTheDocument();

  const username = screen.getByText("Username");
  expect(username).toBeInTheDocument();

  const password = screen.getByText("Password");
  expect(password).toBeInTheDocument();
});

test('renders recovery page', () => {
  render(
    <MemoryRouter >
      <ResetPasswordPage />
    </MemoryRouter >);

  const recover = screen.getByText("Recover Password");
  expect(recover).toBeInTheDocument();

  const email = screen.getByText("Email");
  expect(email).toBeInTheDocument();
});

test('renders account creation page', () => {
  render(
    <MemoryRouter >
      <CreateAccountPage />
    </MemoryRouter>);
    
  const CreateAccount = screen.getByText("Create Account");
  expect(CreateAccount).toBeInTheDocument();

  const username = screen.getByText("Username");
  expect(username).toBeInTheDocument();

  const email = screen.getByText("Email");
  expect(email).toBeInTheDocument();

  const password = screen.getByText("Password");
  expect(password).toBeInTheDocument();

  const confirmPassword = screen.getByText("Confirm Password");
  expect(confirmPassword).toBeInTheDocument();
});