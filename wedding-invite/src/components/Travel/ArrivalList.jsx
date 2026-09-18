export function ArrivalList({ arrivals }) {
  return (
    <dl className="arrivals">
      {arrivals.map(({ id, mode, hub, detail }) => (
        <div className="arrival" key={id}>
          <dt className="arrival__mode">{mode}</dt>
          <dd className="arrival__hub">{hub}</dd>
          <dd className="arrival__detail">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
