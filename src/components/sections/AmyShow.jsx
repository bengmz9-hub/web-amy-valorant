import { useEffect } from 'react';
import WordReveal from '@/components/ui/WordReveal.jsx';

const VIDEOS = [
  { platform: 'tiktok', id: '7581441844328942870', cite: 'https://www.tiktok.com/@amyjgil/video/7581441844328942870', title: 'Clip' },
  { platform: 'tiktok', id: '7611582111362895126', cite: 'https://www.tiktok.com/@amyjgil/video/7611582111362895126', title: 'Un ace del otro día', extra: (
    <> Un ace del otro día <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorant?refer=embed">#valorant</a></>
  ) },
  {
    platform: 'tiktok',
    id: '7596081926155291926',
    cite: 'https://www.tiktok.com/@amyjgil/video/7596081926155291926',
    title: 'Pov un día chill en bcn 🥃',
    extra: (
      <> Pov un día chill en bcn 🥃 <a title="gamegirl" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/gamegirl?refer=embed">#gamegirl</a> <a title="valorantespaña" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorantespaña?refer=embed">#valorantespaña</a> <a title="valorant" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorant?refer=embed">#valorant</a> <a title="valorantgaming" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorantgaming?refer=embed">#valorantgaming</a> <a title="valorantgirls" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/tag/valorantgirls?refer=embed">#valorantgirls</a> <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/music/original-sound-6591555328398068486?refer=embed">⚬ original sound - Dante</a></>
    )
  },
  { platform: 'youtube', id: '-q7uVdc4oKM', title: 'Rap session' },
  { platform: 'youtube', id: 'bZz6Tf3JAlc', title: 'Valorant clip' },
  { platform: 'youtube', id: 't5sQfeAXjc0', title: 'Esos muros en rango alto no sirven, ¿no?' }
];

export default function AmyShow() {
  useEffect(() => {
    if (window.tiktokEmbed) {
      window.tiktokEmbed.load();
      return;
    }

    const existingScript = document.querySelector('script[src*="tiktok.com/embed.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => window.tiktokEmbed?.load());
      return;
    }

    const s = document.createElement('script');
    s.src = 'https://www.tiktok.com/embed.js';
    s.async = true;
    s.onload = () => window.tiktokEmbed?.load();
    document.body.appendChild(s);
  }, []);

  return (
    <section id="shorts" className="shorts-section fade-in-section">
      <div className="section-title">
        <WordReveal as="h2" parts={[{ t: 'The' }, { t: 'Amy Show', hl: true }]} />
        <p>Jugadas, errores y momentos divertidos.</p>
      </div>
      <div className="tiktok-grid" role="region" aria-label="Clips de AMY">
        {VIDEOS.map((v) => (
          <div className="tiktok-wrapper" key={v.id}>
            <span className={'clip-badge clip-badge--' + v.platform}>
              {v.platform === 'youtube' ? 'YouTube' : 'TikTok'}
            </span>
            {v.platform === 'youtube' ? (
              <div className="yt-embed">
                <iframe
                  src={'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=0&mute=1&playsinline=1&loop=1&playlist=' + v.id}
                  title={v.title || 'Short de YouTube'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                />
              </div>
            ) : (
              <blockquote className="tiktok-embed" cite={v.cite} data-video-id={v.id}>
                <section>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@amyjgil?refer=embed">@amyjgil</a>
                  {v.extra}
                </section>
              </blockquote>
            )}
            {v.title && (
              <p className="clip-title">
                {v.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
