

type SvgProgressBarProps = {
  progress: number; // value between 0–100
  width?: number;
  height?: number;
};

export const ProgressBar = ({
  progress,
  width = 300,
  height = 25,
}: SvgProgressBarProps) => {
  const barWidth = (progress / 100) * width;


  return (
    <div className="p-4 ">
      <svg width={width} height={height}>
        {/* Background */}
        <rect x={0} y={0} width={width} height={height} fill="#1E293B" rx={5} />

        {/* Progress fill */}
        <rect
          x={0}
          y={0}
          width={barWidth}
          height={height}
          fill="#3B82F6"
          rx={6}
          style={{ transition: "width 0.35s ease" }}
        />

        {/* Optional percentage text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="14"
        >
          Raffle interval Progress : 
          { Math.round(progress)}%
        </text>
      </svg>
    </div>
  );
};
