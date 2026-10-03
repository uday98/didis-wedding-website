import './Hero.css';
import { useContent } from '../../hooks/useContent';
import { formatDate, formatWeekday } from '../../lib/datetime';
import { useHeroEnter } from '../../hooks/useHeroEnter';
import { Rosette } from '../Ornament/Rosette';
import { Torana } from '../Ornament/Torana';
import { HeroPhoto } from './HeroPhoto';

export function Hero() {
  const { brideName, groomName, tagline, weddingDate, photo, photoAlt } = useContent('couple');
  // Keyed off the envelope finishing, so the opening hands into motion rather
  // than cutting to a still page.
  const enter = useHeroEnter();

  return (
    <header className="hero" data-enter={enter} data-photo={photo ? '' : undefined}>
      <HeroPhoto src={photo} alt={photoAlt} />
      <Rosette />
      <p className="hero__date">
        {formatWeekday(weddingDate)}, {formatDate(weddingDate)}
      </p>
      <h1 className="hero__names">
        <span>{brideName}</span>
        <span className="hero__amp">and</span>
        <span>{groomName}</span>
      </h1>
      <div className="hero__say">
        <p className="hero__tagline">{tagline}</p>
        <Torana />
      </div>
    </header>
  );
}
