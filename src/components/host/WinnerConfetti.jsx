import { useEffect, useRef, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 100,
};

export const WinnerConfetti = ({ winner }) => {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, { spread: 26, startVelocity: 55 });
    makeShot(0.2, { spread: 60 });
    makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    makeShot(0.1, { spread: 120, startVelocity: 45 });
  }, [makeShot]);

  useEffect(() => {
    if (winner) {
      fire();
      const interval = setInterval(fire, 2000);
      return () => clearInterval(interval);
    }
  }, [winner, fire]);

  if (!winner) return null;

  return (
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-black/80 px-12 py-8 rounded-2xl border-4 border-yellow-400 animate-pulse">
          <h1 className="text-6xl font-bold text-yellow-400 text-center">
            WINNER!
          </h1>
          <p
            className="text-4xl font-bold text-center mt-4"
            style={{ color: winner.color }}
          >
            {winner.name}
          </p>
          {winner.rider && (
            <p className="text-2xl text-white text-center mt-2">
              Ridden by {winner.rider}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
