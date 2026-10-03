export function StayCard({ stay }) {
  const { name, tier, distance, priceNote, bookingUrl, phone } = stay;
  return (
    <article className="stay">
      <p className="stay__tier">{tier}</p>
      <h4 className="stay__name">{name}</h4>
      <p className="stay__meta">{distance}</p>
      {priceNote && <p className="stay__meta">{priceNote}</p>}
      {/* Guarded as a whole: with both fields empty -- which is the placeholder
          state -- an unguarded <p> still applies its margin and leaves a gap. */}
      {(bookingUrl || phone) && (
        <p className="stay__actions">
          {bookingUrl && <a href={bookingUrl} target="_blank" rel="noreferrer">Book a room</a>}
          {phone && <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>}
        </p>
      )}
    </article>
  );
}
