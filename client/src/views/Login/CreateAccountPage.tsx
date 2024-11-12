import { Link } from "react-router-dom";
import CreateAccountForm from "../../components/loginForm/CreateAccountForm";
import "../../css/login/CreateAccountPage.css"

export const CreateAccountPage = () => {
  return (
    <div className="register-container">

      <div>
        <Link to="/">
          <button className="back-button" data-testid="back-button">
            <i className="bi bi-box-arrow-in-left" style={{ fontSize: "80px" }}></i>
            Back
          </button>
        </Link>
      </div>

      <div className="page-header">
        <h1 data-testid="create-account-header">Create Account</h1>
      </div>

      <div className="register-form-container">
        <CreateAccountForm />
      </div>
    </div>
  );
};

export default CreateAccountPage;