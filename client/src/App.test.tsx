global.google = {
  accounts: {
      id: {
          initialize: jest.fn(),
          prompt: jest.fn(),
          renderButton: jest.fn(),
      },
  },
};

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginHomepage from './views/LoginHomepage';
import ResetPasswordPage from './views/ResetPasswordPage';
import CreateAccountPage from './views/CreateAccountPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

test('renders login page', () => {
  render(
    <MemoryRouter >
      <LoginHomepage />
    </MemoryRouter >);

  //Test app name
  const TritonCook = screen.getByText("TritonCook");
  expect(TritonCook).toBeInTheDocument();

  //Test slogan
  const slogan = screen.getByText("\"Share, Discover, Savor\"");
  expect(slogan).toBeInTheDocument();

  //Test logo
  const logo = screen.getByRole('img');
  expect(logo).toBeInTheDocument();

  //Test username
  const username = screen.getByText("Username");
  expect(username).toBeInTheDocument();
  const usernameInputField = screen.getByTestId("username-intput-field");
  expect(usernameInputField).toBeInTheDocument();


  //Test password
  const password = screen.getByText("Password");
  expect(password).toBeInTheDocument();
  const passwordInputField = screen.getByPlaceholderText("Enter Password");
  expect(passwordInputField).toBeInTheDocument();

  //Test signin button
  const signin = screen.getByText("Sign In");
  expect(signin).toBeInTheDocument();

  //Test Forgetpass link
  const forgetpass = screen.getByText("Forgot Password?");
  expect(forgetpass).toBeInTheDocument();

  //Test Create New Account
  const newAccount = screen.getByText("Create New Account");
  expect(newAccount).toBeInTheDocument();

  //Test Sigin with google
  const googleLink = screen.getByTestId("googleButton");
  expect(googleLink).toBeInTheDocument();
});

test('renders recovery page', () => {
  render(
    <MemoryRouter >
      <ResetPasswordPage />
    </MemoryRouter >);

  //Test header
  const recover = screen.getByText("Recover Password");
  expect(recover).toBeInTheDocument();

  //Test back button
  const backButton = screen.getByTestId("back-button");
  expect(backButton).toBeInTheDocument();

  //Test form
  const instruction = screen.getByTestId("instructions");
  expect(instruction).toBeInTheDocument();

  const email = screen.getByText("Email");
  expect(email).toBeInTheDocument();

  const emailInputField = screen.getByPlaceholderText("Enter Email");
  expect(emailInputField).toBeInTheDocument();

  const submitButton = screen.getByText("RESET PASSWORD");
  expect(submitButton).toBeInTheDocument();

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
  const usernameInputField = screen.getByPlaceholderText("Enter Username");
  expect(usernameInputField).toBeInTheDocument();

  const email = screen.getByText("Email");
  expect(email).toBeInTheDocument();
  const emailInputField = screen.getByPlaceholderText("Enter UCSD Email");
  expect(emailInputField).toBeInTheDocument();


  const password = screen.getByText("Password");
  expect(password).toBeInTheDocument();
  const passwordInputField = screen.getByPlaceholderText("Enter Password");
  expect(passwordInputField).toBeInTheDocument();

  const confirmPassword = screen.getByText("Confirm Password");
  expect(confirmPassword).toBeInTheDocument();
  const confirmpasswordInputField = screen.getByPlaceholderText("Enter Confirm Password");
  expect(confirmpasswordInputField).toBeInTheDocument();

});

test('linked pages', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
          <Route path="/" element={<LoginHomepage />} />
          <Route path="/reset-pass" element={<ResetPasswordPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
    </MemoryRouter>
  );

  /*Check forget password link on the login homepage
  It would direct us to the Recover Password page */
  //Get the link
  const forgetPasswordLink = screen.getByText("Forgot Password?");
  //Click on it
  fireEvent.click(forgetPasswordLink);
  //Check that if we are in the recover password page
  expect(screen.getByText("Recover Password")).toBeInTheDocument();

  /*We are at the Recover Password Page. Now check the back button on this page
    We will be back to the homepage */
  let backButton = screen.getByTestId("back-button");
  fireEvent.click(backButton);
  expect(screen.getByText("\"Share, Discover, Savor\"")).toBeInTheDocument(); //Check that if we are in the homepage

  /*We are at the login homepage
  Test the "Create New Account" button if it worked correctly*/
  const createAccounButton = screen.getByText("Create New Account");
  fireEvent.click(createAccounButton);
  expect(screen.getByText("Create Account")).toBeInTheDocument(); //Check that if we are in the creation page

  /*We are at the Recover Password Page. Now check the back button on this page
    We will be back to the homepage */
  backButton = screen.getByTestId("back-button");
  fireEvent.click(backButton);
  expect(screen.getByText("\"Share, Discover, Savor\"")).toBeInTheDocument(); //Check that if we are in the homepage


});