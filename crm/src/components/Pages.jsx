import { useState } from "react";
import StatCard from "./StatCard.jsx";
import PropertyGrid, { slug } from "./PropertyGrid.jsx";
import { clients, mandates } from "../data.js";

const Badge = ({ children }) => <span className={`badge badge-inline badge-${slug(children)}`}>{children}</span>;

function VisitList({ visits, properties }) {
  const title = (id) => properties.find((p) => p.id === id);
  return (
    <ul className="rows">
      {visits.map((v) => (
        <li key={v.id} className="row">
          <div className="row-when">
            <strong>{v.day}</strong>
            <span className="muted tabular">{v.time}</span>
          </div>
          <div className="row-main">
            <strong>{title(v.propertyId)?.title}</strong>
            <span className="muted">
              {title(v.propertyId)?.city} · {v.client}
            </span>
          </div>
          <Badge>{v.status}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function Dashboard({ stats, properties, visits, onOpen, goTo }) {
  return (
    <>
      <section className="stats" aria-label="Statistiques">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      <section aria-labelledby="recent-title">
        <div className="section-head">
          <h2 id="recent-title" className="section-title">Biens récents</h2>
          <button type="button" className="btn btn-ghost" onClick={() => goTo("Biens")}>Voir tous les biens</button>
        </div>
        <PropertyGrid properties={properties.slice(0, 3)} onOpen={onOpen} />
      </section>

      <section aria-labelledby="next-title">
        <div className="section-head">
          <h2 id="next-title" className="section-title">Prochaines visites</h2>
          <button type="button" className="btn btn-ghost" onClick={() => goTo("Visites")}>Toutes les visites</button>
        </div>
        <VisitList visits={visits.slice(0, 3)} properties={properties} />
      </section>
    </>
  );
}

const STATUSES = ["Tous", "Disponible", "Sous offre", "Vendu"];

export function Biens({ properties, onOpen }) {
  const [filter, setFilter] = useState("Tous");
  const [q, setQ] = useState("");
  const count = (s) => (s === "Tous" ? properties.length : properties.filter((p) => p.status === s).length);
  const needle = q.trim().toLowerCase();
  const shown = properties.filter(
    (p) => (filter === "Tous" || p.status === filter) && `${p.title} ${p.city}`.toLowerCase().includes(needle)
  );
  const chips = STATUSES.filter((s) => s === "Tous" || count(s) > 0 || s === filter);

  return (
    <section aria-label="Liste des biens">
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filtrer par statut">
          {chips.map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
              {s} <span className="tabular">{count(s)}</span>
            </button>
          ))}
        </div>
        <input
          className="search"
          type="search"
          placeholder="Rechercher un bien ou une ville"
          aria-label="Rechercher un bien ou une ville"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {shown.length ? (
        <PropertyGrid properties={shown} onOpen={onOpen} />
      ) : (
        <p className="empty">Aucun bien ne correspond à cette recherche.</p>
      )}
    </section>
  );
}

export function Clients() {
  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">Liste des clients</caption>
        <thead>
          <tr><th>Nom</th><th>Type</th><th>Projet</th><th>Statut</th><th>Dernier contact</th></tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td><strong>{c.name}</strong></td>
              <td>{c.type}</td>
              <td>{c.project}</td>
              <td><Badge>{c.status}</Badge></td>
              <td className="muted">{c.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Visites({ visits, properties }) {
  return <VisitList visits={visits} properties={properties} />;
}

export function Mandats({ properties }) {
  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">Liste des mandats</caption>
        <thead>
          <tr><th>Bien</th><th>Type</th><th>Début</th><th>Fin</th><th>Commission</th><th>Statut</th></tr>
        </thead>
        <tbody>
          {mandates.map((m) => (
            <tr key={m.id}>
              <td><strong>{properties.find((p) => p.id === m.propertyId)?.title}</strong></td>
              <td>{m.type}</td>
              <td>{m.start}</td>
              <td>{m.end}</td>
              <td className="tabular">{m.commission}</td>
              <td><Badge>{m.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Parametres({ agencyName, setAgencyName, hideSold, setHideSold }) {
  return (
    <form className="form settings" onSubmit={(e) => e.preventDefault()}>
      <label>
        Nom de l'agence
        <input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} maxLength={30} />
      </label>
      <label className="check">
        <input type="checkbox" checked={hideSold} onChange={(e) => setHideSold(e.target.checked)} />
        Masquer les biens vendus
      </label>
    </form>
  );
}
