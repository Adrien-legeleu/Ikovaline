'use client';

import { Gauge } from './Gauge';

export default function ProgressGauge({
  value,
  size = 120,
}: {
  value: number;
  size?: number;
}) {
  return (
    <Gauge
      value={value}
      size={120}
      strokeWidth={10}
      equal
      showValue
      showPercentage
      transition={{ length: 1200, delay: 200 }}
      unit="%"
      // 💙 Thème bleu permanent
      primary="#01B7FF" // blue-600
      secondary="#dbeafe" // blue-100 (anneau résiduel)
      gradient
      tickMarks={true}
    />
  );
}
