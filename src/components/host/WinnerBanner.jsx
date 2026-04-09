/**
 * WinnerBanner - Simple CSS-animated winner celebration
 */

export const WinnerBanner = ({ winner }) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* Animated background overlay */}
      <div
        className="absolute inset-0 winner-bg-pulse"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      />

      {/* Decorative bursts */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="winner-burst winner-burst-1" />
        <div className="winner-burst winner-burst-2" />
        <div className="winner-burst winner-burst-3" />
      </div>

      {/* Main banner */}
      <div
        className="relative winner-banner-pop px-16 py-10 rounded-2xl text-center"
        style={{
          backgroundColor: 'var(--chult-jungle-dark)',
          border: '4px solid var(--chult-gold)',
          boxShadow: '0 0 60px var(--chult-gold), 0 0 100px rgba(201, 162, 39, 0.5)',
        }}
      >
        {/* Trophy icon */}
        <div
          className="text-6xl mb-4 winner-trophy-bounce"
          style={{ color: 'var(--chult-gold)' }}
        >
          🏆
        </div>

        {/* Winner text */}
        <h1
          className="text-5xl font-bold mb-4 winner-text-glow"
          style={{ color: 'var(--chult-gold)' }}
        >
          WINNER!
        </h1>

        {/* Dinosaur name */}
        <p
          className="text-4xl font-bold mb-2"
          style={{ color: winner.color }}
        >
          {winner.name}
        </p>

        {/* Rider name */}
        {winner.rider && (
          <p
            className="text-2xl"
            style={{ color: 'var(--chult-cream)' }}
          >
            Ridden by {winner.rider}
          </p>
        )}

        {/* Decorative stars */}
        <div className="absolute -top-4 -left-4 text-3xl winner-star-spin">✦</div>
        <div className="absolute -top-4 -right-4 text-3xl winner-star-spin" style={{ animationDelay: '0.5s' }}>✦</div>
        <div className="absolute -bottom-4 -left-4 text-3xl winner-star-spin" style={{ animationDelay: '1s' }}>✦</div>
        <div className="absolute -bottom-4 -right-4 text-3xl winner-star-spin" style={{ animationDelay: '1.5s' }}>✦</div>
      </div>
    </div>
  );
};
