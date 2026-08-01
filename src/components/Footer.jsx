export default function Footer() {
  return (
    <footer aria-label="Pie de página">
      <div className="footer-content">
        <div className="footer-section"><h3>AMY</h3><p>Content Creator</p></div>
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="#agents">Especialidades</a></li>
            <li><a href="#gear">Setup</a></li>
            <li><a href="#shorts">The Amy Show</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Social</h3>
          <a href="https://www.tiktok.com/@amyjgil" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.youtube.com/@AmyJGil" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom"><p>© 2026 AMY // Content Creator Portfolio</p></div>
    </footer>
  );
}
