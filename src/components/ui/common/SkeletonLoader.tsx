import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'rank' | 'challenge' | 'leaderboard';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  variant = 'card',
  count = 1
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "leaderboard":
        return (
          <div className="relative rounded-lg p-4 md:p-6 shadow-lg bg-stone-900/90 animate-pulse overflow-hidden">
         

            {/* Header */}
            <div className="relative h-8 w-3/4 bg-gradient-to-r from-amber-900/40 to-amber-700/40 rounded mb-4 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="absolute left-0 top-0 h-full w-1 bg-amber-500/70"></div>
            </div>

            {/* Leaderboard items */}
            <div className="space-y-3 relative">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-stone-800/80 border border-amber-800/20 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="h-full w-1/4 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Rank emblem */}
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-900/60 to-amber-700/60 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <div
                          className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        ></div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-stone-800/50 border border-amber-600/30"></div>
                    </div>

                    <div>
                      <div className="h-4 w-24 bg-gradient-to-r from-amber-900/40 to-amber-700/40 rounded mb-2 overflow-hidden">
                        <div
                          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"
                          style={{ animationDelay: `${index * 0.15}s` }}
                        ></div>
                      </div>
                      <div className="h-3 w-16 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded overflow-hidden">
                        <div
                          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                          style={{ animationDelay: `${index * 0.25}s` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="h-6 w-16 bg-gradient-to-r from-amber-700/50 to-amber-600/50 rounded-full overflow-hidden">
                    <div
                      className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "rank":
        return (
          <div className="relative rounded-lg p-4 md:p-6 shadow-lg bg-stone-900/90 animate-pulse  overflow-hidden">
          

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-amber-500/5"></div>

            {/* Shield decoration */}
            <div className="absolute -right-4 -top-4 w-16 h-16 opacity-10">
              <svg viewBox="0 0 100 100">
                <path
                  d="M50 10 L75 25 L75 60 C75 75 65 85 50 90 C35 85 25 75 25 60 L25 25 Z"
                  fill="url(#goldGradient)"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="relative h-8 w-3/4 bg-gradient-to-r from-amber-900/40 to-amber-700/40 rounded mb-4 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="absolute left-0 top-0 h-full w-1 bg-amber-500/70"></div>
            </div>
            <div className="relative h-4 w-full bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.1s" }}
              ></div>
            </div>
            <div className="relative h-4 w-5/6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="relative h-4 w-4/6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-4 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <div className="relative h-3 w-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 rounded overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-shimmer"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )
      case "challenge":
        return (
          <div className="relative rounded-lg p-4 min-h-[220px] flex flex-col  shadow-[inset_0_5px_3px_rgba(0,0,0,0.8)] overflow-hidden bg-stone-900/90 animate-pulse">
          

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-amber-500/5"></div>

            {/* Medieval banner at top */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-24 h-6">
              <div className="w-full h-full bg-gradient-to-b from-amber-700/40 to-amber-600/40 rounded-b-lg"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-amber-800/40"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[8px] border-r-transparent border-b-[8px] border-b-amber-800/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-6 w-3/4 bg-gradient-to-r from-amber-900/40 to-amber-700/40 rounded mb-2 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="absolute left-0 top-0 h-full w-1 bg-amber-500/70"></div>
            </div>
            <div className="relative h-4 w-full bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.1s" }}
              ></div>
            </div>
            <div className="relative h-4 w-5/6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="relative h-4 w-4/6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>

            {/* Button */}
            <div className="mt-auto relative h-10 w-full bg-gradient-to-r from-amber-800/50 to-amber-700/50 rounded overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <div className="absolute inset-0 border border-amber-500/30 rounded"></div>
            </div>
          </div>
        )
      case "card":
      default:
        return (
          <div className="relative rounded-lg p-4 md:p-6 shadow-lg bg-stone-900/90 animate-pulse  overflow-hidden">
           

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-amber-500/5"></div>

            {/* Content */}
            <div className="relative h-8 w-3/4 bg-gradient-to-r from-amber-900/40 to-amber-700/40 rounded mb-4 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent animate-shimmer"></div>
              </div>
              <div className="absolute left-0 top-0 h-full w-1 bg-amber-500/70"></div>
            </div>
            <div className="relative h-4 w-full bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.1s" }}
              ></div>
            </div>
            <div className="relative h-4 w-5/6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-2 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="relative h-4 w-4/6 bg-gradient-to-r from-amber-900/30 to-amber-700/30 rounded mb-4 overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-shimmer"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <div className="relative h-3 w-full bg-gradient-to-r from-amber-900/20 to-amber-700/20 rounded overflow-hidden">
              <div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-shimmer"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )
    }
  }

  if (count === 1) {
    return <div className={className}>{renderSkeleton()}</div>
  }

  return (
    <div className={className}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="mb-4">
            {renderSkeleton()}
          </div>
        ))}
    </div>
  )
}; 