export function LocalHelp({ transportNote, contacts }) {
  return (
    <div className="local">
      <p className="local__note">{transportNote}</p>
      <ul className="local__contacts">
        {contacts.map(({ id, name, role, phone }) => (
          <li key={id}>
            <span className="local__name">{name}</span>
            <span className="local__role">{role}</span>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
