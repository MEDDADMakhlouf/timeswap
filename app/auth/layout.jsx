import "./auth.css";
import "./reset.css";

export default function ({ children }) {
  return (
    <div id="auth-layout">
      <div id="auth-left">
        <img src="/logo.svg" alt="" />
        <p>To easily request and manage schedule swaps</p>
      </div>
      <div id="auth-content">{children}</div>
    </div>
  );
}
