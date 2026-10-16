const agents = [
  { name: 'Gerry Ray', whatsapp: '523221812109', phone: '+523221812109', email: 'gerry@ronmorgan.net', website: 'gerryray.net' },
  { name: 'Joselo Cortes', whatsapp: '523221900492', phone: '+523221900492', email: 'joselo@ronmorgan.net', website: 'joselo.net' },
];

export default function AgentContacts({ listing, isSpanish = false, compact = false }) {
  const subject = `${isSpanish ? 'Consulta sobre' : 'Inquiry about'} ${listing.title}`;
  const message = isSpanish
    ? `Hola, me interesa ${listing.title} en ${listing.addressOrArea}. ¿Me puedes compartir más información y disponibilidad?`
    : `Hi! I'm interested in ${listing.title} in ${listing.addressOrArea}. Can you share details and availability?`;
  return (
    <div className={`agentGrid ${compact ? 'compact' : ''}`}>
      {agents.map((agent) => (
        <div className="agentCard" key={agent.email}>
          <div className="agentName">{agent.name}</div>
          <div className="brokerage">Ron Morgan Properties</div>
          <div className="agentActions">
            <a href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}>{isSpanish ? 'Correo' : 'Email'}</a>
            <a href={`tel:${agent.phone}`}>{isSpanish ? 'Llamar' : 'Call'}</a>
          </div>
          <a className="agentSite" href={`https://${agent.website}`} target="_blank" rel="noreferrer">{agent.website}</a>
        </div>
      ))}
      <style jsx>{`
        .agentGrid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; width:100%; }
        .agentCard { border:1px solid #dbe5f0; border-radius:16px; padding:16px; background:#f8fbff; min-width:0; }
        .agentName { font-weight:800; font-size:19px; color:#0f172a; }
        .brokerage { color:#64748b; font-size:12px; margin-top:3px; }
        .agentActions { display:flex; flex-wrap:wrap; gap:7px; margin:14px 0 10px; }
        .agentActions a { background:#2563eb; color:white; text-decoration:none; padding:9px 12px; border-radius:9px; font-size:13px; font-weight:700; }
        .agentActions a:hover { background:#1d4ed8; }
        .agentSite { color:#1d4ed8; font-size:13px; text-decoration:underline; }
        .compact .agentCard { padding:13px; }
        @media(max-width:600px) { .agentGrid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}
