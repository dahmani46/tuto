import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { duration, easeOut, stagger } from "../motion.js";
import { euro } from "../data.js";

const list = { hidden: {}, show: { transition: { staggerChildren: stagger } } };

function itemVariants(reduce) {
  // Full transform strings: Motion's x/y shorthands are not hardware-accelerated.
  return reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } } }
    : {
        hidden: { opacity: 0, transform: "translateY(8px)" },
        show: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: duration.enter, ease: easeOut },
        },
      };
}

// The staggered entrance is decorative and navigation/filtering happens many times a day:
// it plays once per page load, then cards appear instantly.
let entrancePlayed = false;

export default function PropertyGrid({ properties, onOpen }) {
  const reduce = useReducedMotion();
  const item = itemVariants(reduce);
  const [first] = useState(!entrancePlayed);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    entrancePlayed = true;
    setEntered(true);
  }, []);

  return (
    <motion.ul className="grid" variants={list} initial={first && !entered ? "hidden" : false} animate="show">
      {properties.map((p) => (
        <motion.li key={p.id} variants={item}>
          <button type="button" className="card" onClick={(e) => onOpen(p, e.currentTarget)}>
            <div className="card-media">
              {p.image && (
                <img src={p.image} alt="" loading="lazy" onError={(e) => (e.currentTarget.hidden = true)} />
              )}
              <span className={`badge badge-${slug(p.status)}`}>{p.status}</span>
            </div>
            <div className="card-body">
              <h3>{p.title}</h3>
              <p className="muted">{p.city}</p>
              <p className="card-meta">
                <strong className="tabular">{euro(p.price)}</strong>
                <span>
                  {p.surface} m² · {p.rooms} p.
                </span>
              </p>
            </div>
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
