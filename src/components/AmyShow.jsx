const VIDEOS = [
  { id: '7581441844328942870', cite: 'https://www.tiktok.com/@amyjgil/video/7581441844328942870' },
  { id: '7611582111362895126', cite: 'https://www.tiktok.com/@amyjgil/video/7611582111362895126', extra: (
    <> Un ace del otro día <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorant?refer=embed">#valorant</a></>
  ) },
  {
    id: '7596081926155291926',
    cite: 'https://www.tiktok.com/@amyjgil/video/7596081926155291926',
    extra: (
      <> Pov un día chill en bcn 🙃 <a title="gamegirl" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/gamegirl?refer=embed">#gamegirl</a> <a title="valorantespaña" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorantespa%C3%B1a?refer=embed">#valorantespaña</a> <a title="valorant" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorant?refer=embed">#valorant</a> <a title="valorantgaming" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorantgaming?refer=embed">#valorantgaming</a> <a title="valorantgirls" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorantgirls?refer=embed">#valorantgirls</a> <a target="_blank" rel="noopener noreferrer" title="♬ original sound - &quot;The Audio Demon&quot; Dante" href="https://www.tiktok.com/music/original-sound-6591555328398068486?refer=embed">♬ original sound - "The Audio Demon" Dante</a></>
    )
  }
];

export default function AmyShow() {
  return (
    <section id="shorts" className="shorts-section fade-in-section">
      <div className="section-title">
        <h2>The <span className="highlight">Amy Show</span></h2>
        <p>Jugadas, errores y momentos divertidos.</p>
      </div>
      <div className="tiktok-grid">
        {VIDEOS.map((v) => (
          <div className="tiktok-wrapper" key={v.id}>
            <blockquote className="tiktok-embed" cite={v.cite} data-video-id={v.id} style={{ maxWidth: '605px', minWidth: '325px' }}>
              <section>
                <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@amyjgil?refer=embed">@amyjgil</a>
                {v.extra}
              </section>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
