import React, { useState, useRef } from "react";


function MonthDial() {
  const [months, setMonths] = useState(3);
  const svgRef = useRef(null);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  // Convert months to angle
  const angle = (months / 12) * 360;

  // Calculate arc length
  const arcLength = (angle / 360) * circumference;

  const centerX = 100;
  const centerY = 100;

  // Calculate knob position
  const knobX = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
  const knobY = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

  // Get current date as start date
  const startDate = new Date();
  const startMonthDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  // Calculate end date
  const endDate = new Date(startMonthDate);
  endDate.setMonth(startMonthDate.getMonth() + months);

  const handleMouseMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const newAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    let adjAngle = newAngle < 0 ? newAngle + 360 : newAngle;
    // Snap to nearest month
    const newMonths = Math.min(12, Math.max(1, Math.round((adjAngle / 360) * 12)));
    setMonths(newMonths);
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold mb-2">When’s your trip?</div>
      <svg ref={svgRef} width="200" height="200" className="mb-4">
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="#eee"
          strokeWidth="20"
          fill="none"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="#ff5a5f"
          strokeWidth="20"
          fill="none"
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${centerY})`}
        />
        <circle
          cx={knobX}
          cy={knobY}
          r="12"
          fill="#fff"
          stroke="#ff5a5f"
          strokeWidth="4"
          onMouseDown={handleMouseDown}
          style={{ cursor: "grab" }}
        />
      </svg>
      <div className="text-4xl font-bold">{months}</div>
      <div className="text-sm mb-4">months</div>
      <div className="font-medium text-center">
        {startMonthDate.toDateString()} to {endDate.toDateString()}
      </div>
    </div>
  );
}

export default MonthDial;
