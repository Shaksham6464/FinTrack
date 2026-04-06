
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      
      {/* Animated Background */}
      <div className="landing-bg"></div>

      <div className="landing-content">
        <h1 className="landing-title">
          Smart Finance <span>Dashboard</span>
        </h1>

        <p className="landing-sub">
          Track your income, analyze expenses, and gain insights into your financial life.
        </p>

        <button
          className="get-started-btn"
          onClick={() => navigate("/dashboard")}
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}