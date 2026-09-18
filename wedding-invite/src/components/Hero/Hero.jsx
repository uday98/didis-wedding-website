import './Hero.css';
import { useContent } from '../../hooks/useContent';
import { formatDate, formatWeekday } from '../../lib/datetime';

export function Hero() {
  const { brideName, groomName, tagline, weddingDate } = useContent('couple');
  return (
    <header className="hero">
      <p className="hero__date">
        {formatWeekday(weddingDate)}, {formatDate(weddingDate)}
      </p>
      <h1 className="hero__names">
        <span>{brideName}</span>
        <span className="hero__amp">and</span>
        <span>{groomName}</span>
      </h1>
      <p className="hero__tagline">{tagline}</p>
    </header>
  );
}
