import { LoginForm } from "../../../modules/user-auth/components";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1>Login</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
