import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Minimal scroll reveal wrapper using IntersectionObserver.
// Keeps animations premium (subtle fade + lift), respects prefers-reduced-motion.

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  once = true,
}) => {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

