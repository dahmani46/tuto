import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import Sidebar from "./components/Sidebar.jsx";
import Modal from "./components/Modal.jsx";
import { Biens, Clients, Dashboard, Mandats, Parametres, Visites } from "./components/Pages.jsx";
import { euro, initialProperties, initialVisits } from "./data.js";

const int = (v) => Math.round(v).toLocaleString("fr-FR");
const money = (v) => euro(Math.round(v));
const percent = (v) => `${Math.round(v)} %`;

function useIsSmallScreen() {
  const query = "(max-width: 960px)";
  const [small, setSmall] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setSmall(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return small;
}

export default function App() {
  const [allProperties, setProperties] = useState(initialProperties);
  const [visits, setVisits] = useState(initialVisits);
  const [agencyName, setAgencyName] = useState("CRM Immo");
  const [hideSold, setHideSold] = useState(false);
  const [modal, setModal] = useState(null); // { type: "detail", property } | { type: "new" }
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("Tableau de bord");
  const isSmall = useIsSmallScreen();
  const modalTrigger = useRef(null);
  const menuTrigger = useRef(null);

  const closeModal = useCallback(() => setModal(null), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openModal = (next, trigger) => {
    modalTrigger.current = trigger;
    setModal(next);
  };
  const openProperty = (p, el) => openModal({ type: "detail", property: p }, el);

  const properties = hideSold ? allProperties.filter((p) => p.status !== "Vendu") : allProperties;
  const available = allProperties.filter((p) => p.status !== "Vendu");
  const sold = allProperties.length - available.length;
  const stats = [
    { label: "Biens en portefeuille", value: available.length, format: int },
    { label: "Valeur du portefeuille", value: available.reduce((s, p) => s + p.price, 0), format: money },
    { label: "Visites cette semaine", value: visits.length, format: int },
    { label: "Taux de vente", value: (sold / allProperties.length) * 100, format: percent },
  ];

  function scheduleVisit(property) {
    setVisits((list) => [
      ...list,
      { id: Date.now(), day: "Ven. 6 nov.", time: "16:00", propertyId: property.id, client: "À définir", status: "À confirmer" },
    ]);
    closeModal();
  }

  function addProperty(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setProperties((list) => [
      ...list,
      {
        id: Date.now(),
        title: f.get("title"),
        city: f.get("city"),
        price: Number(f.get("price")),
        surface: Number(f.get("surface")),
        rooms: Number(f.get("rooms")),
        status: "Disponible",
        image: "",
      },
    ]);
    closeModal();
  }

  return (
    // reducedMotion="user": Motion drops transform animations when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <div className="layout">
        <Sidebar
          brand={agencyName}
          isDrawer={isSmall}
          open={menuOpen}
          onClose={closeMenu}
          active={page}
          onNavigate={setPage}
          returnFocus={menuTrigger}
        />

        <main className="main">
          <header className="topbar">
            {isSmall && (
              <button
                ref={menuTrigger}
                type="button"
                className="btn btn-ghost btn-icon"
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                ☰
              </button>
            )}
            <h1>{page}</h1>
            <button type="button" className="btn" onClick={(e) => openModal({ type: "new" }, e.currentTarget)}>
              + Nouveau bien
            </button>
          </header>

          {/* Keyed so each page remounts with a 120ms opacity fade: navigation is a tens-per-day action. */}
          <div className="page" key={page}>
            {page === "Tableau de bord" && (
              <Dashboard stats={stats} properties={properties} visits={visits} onOpen={openProperty} goTo={setPage} />
            )}
            {page === "Biens" && <Biens properties={properties} onOpen={openProperty} />}
            {page === "Clients" && <Clients />}
            {page === "Visites" && <Visites visits={visits} properties={allProperties} />}
            {page === "Mandats" && <Mandats properties={allProperties} />}
            {page === "Paramètres" && (
              <Parametres agencyName={agencyName} setAgencyName={setAgencyName} hideSold={hideSold} setHideSold={setHideSold} />
            )}
          </div>
        </main>
      </div>

      <Modal
        open={modal?.type === "detail"}
        onClose={closeModal}
        title={modal?.property?.title ?? ""}
        returnFocus={modalTrigger}
      >
        {modal?.property && <PropertyDetail property={modal.property} onClose={closeModal} onSchedule={scheduleVisit} />}
      </Modal>

      <Modal open={modal?.type === "new"} onClose={closeModal} title="Nouveau bien" returnFocus={modalTrigger}>
        <form className="form" onSubmit={addProperty}>
          <label>
            Titre
            <input name="title" required data-autofocus />
          </label>
          <label>
            Ville
            <input name="city" required />
          </label>
          <div className="form-row">
            <label>
              Prix (€)
              <input name="price" type="number" min="0" required />
            </label>
            <label>
              Surface (m²)
              <input name="surface" type="number" min="0" required />
            </label>
            <label>
              Pièces
              <input name="rooms" type="number" min="1" required />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={closeModal}>
              Annuler
            </button>
            <button type="submit" className="btn">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </MotionConfig>
  );
}

function PropertyDetail({ property: p, onClose, onSchedule }) {
  return (
    <div className="detail">
      {p.image && <img className="detail-img" src={p.image} alt="" onError={(e) => (e.currentTarget.hidden = true)} />}
      <dl className="detail-list">
        <div><dt>Ville</dt><dd>{p.city}</dd></div>
        <div><dt>Prix</dt><dd className="tabular">{euro(p.price)}</dd></div>
        <div><dt>Surface</dt><dd>{p.surface} m²</dd></div>
        <div><dt>Pièces</dt><dd>{p.rooms}</dd></div>
        <div><dt>Statut</dt><dd>{p.status}</dd></div>
      </dl>
      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Fermer
        </button>
        <button type="button" className="btn" onClick={() => onSchedule(p)}>
          Planifier une visite
        </button>
      </div>
    </div>
  );
}
