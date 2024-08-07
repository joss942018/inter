const Animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeOpacity: {
    initial: { opacity: 0 },
    animate: { opacity: 0.8 },
    exit: { opacity: 0 },
  },
  card: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  },
  dropdown: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "visible" },
    exit: { opacity: 0, height: 0, overflow: "hidden" },
  },
  hover: {
    whileHover: {
      scale: 1.05,
    },
    whileTap: { scale: 0.95 },
  },
  slideForward: {
    initial: { x: "-10px" },
    animate: { x: 0 },
    exit: { x: "10px" },
  },
  zoomIn: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  },
  modal: {
    initial: {
      opacity: 0,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0.5)",
    },
    animate: {
      opacity: 1,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(1)",
    },
    exit: {
      opacity: 0,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0.5)",
    },
  },
};

export default Animations;
