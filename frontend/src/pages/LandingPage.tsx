import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import "../styles/landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">N</div>
          <span>NexChat</span>
        </div>

        <Link to="/register" className="get-started-btn">
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="badge">
          ● NEW: NEXCHAT FOR DESKTOP IS OUT
        </div>

        <h1>
          Chat in Real-Time,
          <br />
          <span>Everywhere.</span>
        </h1>

        <p>
          The next generation of high-performance communication.
          Experience technological serenity with end-to-end
          encryption and lightning-fast synchronization.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="primary-btn">
            Start Chatting
          </Link>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </section>

      {/* Chat Preview */}
      <section className="chat-preview">
        <div className="chat-window">

          <div className="chat-header">
            General Channel
          </div>

          <div className="chat-body">

            <div className="message left">
              Hey team! Has everyone checked the new
              encryption specs?
            </div>

            <div className="message right">
              Everything looks solid. The implementation
              is perfect.
            </div>

            <div className="message left">
              Awesome! Let's ship it 🚀
            </div>

          </div>

          <div className="chat-input">
            Message #general...
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="features">

        <h2>Built for the Future</h2>

        <p>
          NexChat combines security, speed and design
          for seamless messaging.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Real-time Sync</h3>
            <p>
              Instantly synchronize messages, files
              and settings.
            </p>
          </div>

          <div className="feature-card">
            <h3>End-to-End Encryption</h3>
            <p>
              Every message is encrypted and decrypted
              only by the recipient.
            </p>
          </div>

          <div className="feature-card">
            <h3>Universal Search</h3>
            <p>
              Find exactly what you need across chats
              and files.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta">

        <h2>Ready to join the conversation?</h2>

        <p>
          Join thousands already building the future
          on NexChat.
        </p>

        <div className="cta-buttons">
          <Link to="/register" className="primary-btn">
            Create Free Account
          </Link>

          <button className="secondary-btn">
            Talk to Sales
          </button>
        </div>

      </section>

      <Footer />
    </div>
  );
}