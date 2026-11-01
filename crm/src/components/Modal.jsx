import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { duration, easeOut } from "../motion.js";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, title, returnFocus, children }) {
  const reduce = useReducedMotion();
  const panel = useRef(null);
  const t = { duration: duration.modal, ease: easeOut };

  useEffect(() => {
    if (!open) return;
    const node = panel.current;
    (node.querySelector("[data-autofocus]") || node.querySelector(FOCUSABLE) || node).focus();

    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const items = [...node.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence onExitComplete={() => returnFocus?.current?.focus()}>
      {open && (
        <div className="modal-root">
          <motion.div
            className="backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={t}
          />
          {/* Modals stay centred (not anchored to a trigger): scale from 0.96, never 0. */}
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            className="modal"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "scale(1)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96)" }}
            transition={t}
          >
            <header className="modal-header">
              <h2 id="modal-title">{title}</h2>
              <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Fermer">
                ✕
              </button>
            </header>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
