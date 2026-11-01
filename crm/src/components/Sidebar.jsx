import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { duration, easeDrawer } from "../motion.js";

const links = ["Tableau de bord", "Biens", "Clients", "Visites", "Mandats", "Paramètres"];

function Nav({ active, onNavigate }) {
  return (
    <nav aria-label="Navigation principale">
      <p className="brand">CRM Immo</p>
      <ul className="nav">
        {links.map((l) => (
          <li key={l}>
            {/* Navigation is used tens of times a day: the active state changes instantly. */}
            <button
              type="button"
              className={`nav-link${l === active ? " is-active" : ""}`}
              aria-current={l === active ? "page" : undefined}
              onClick={() => onNavigate(l)}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Desktop: the sidebar is always there, nothing to animate.
// Small screens: it becomes a drawer that slides in from the edge it lives on.
export default function Sidebar({ isDrawer, open, onClose, active, onNavigate, returnFocus }) {
  const reduce = useReducedMotion();
  const panel = useRef(null);
  const t = { duration: duration.drawer, ease: easeDrawer };

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector("button")?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!isDrawer) {
    return (
      <aside className="sidebar">
        <Nav active={active} onNavigate={onNavigate} />
      </aside>
    );
  }

  return (
    <AnimatePresence onExitComplete={() => returnFocus?.current?.focus()}>
      {open && (
        <div className="drawer-root">
          <motion.div
            className="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={t}
          />
          <motion.aside
            ref={panel}
            className="sidebar sidebar-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 0 } : { transform: "translateX(-100%)" }}
            animate={reduce ? { opacity: 1 } : { transform: "translateX(0%)" }}
            exit={reduce ? { opacity: 0 } : { transform: "translateX(-100%)" }}
            transition={t}
          >
            <Nav
              active={active}
              onNavigate={(l) => {
                onNavigate(l);
                onClose();
              }}
            />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
