import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { duration, easeOut } from "../motion.js";

// Count from 0 only on the first dashboard view of the session: a number the
// agent reads several times a day must not replay a show every visit.
let alreadyCounted = false;
try {
  alreadyCounted = sessionStorage.getItem("crm-counted") === "1";
} catch {}

export default function CountUp({ value, format }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const current = useRef(alreadyCounted || reduce ? value : 0);

  useEffect(() => {
    const node = ref.current;
    if (reduce) {
      current.current = value;
      node.textContent = format(value);
      return;
    }
    // Retargets from the value currently displayed, so a change mid-count
    // continues smoothly instead of restarting.
    const controls = animate(current.current, value, {
      duration: duration.count,
      ease: easeOut,
      onUpdate: (v) => {
        current.current = v;
        node.textContent = format(v);
      },
    });
    alreadyCounted = true;
    try {
      sessionStorage.setItem("crm-counted", "1");
    } catch {}
    return () => controls.stop();
  }, [value, reduce, format]);

  return (
    <>
      <span ref={ref} className="tabular" aria-hidden="true">
        {format(current.current)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}
