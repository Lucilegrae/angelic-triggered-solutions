'use client';

import { useEffect, useState } from 'react';

interface Props {
  enrolmentId: string;
}

export default function GoldenStar({ enrolmentId }: Props) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('submitted');
  const [complete, setComplete] = useState(false);

  const steps = ['submitted', 'reviewing', 'approved'];

  const fetchProgress = async () => {
    const res = await fetch(`/api/progress?id=${enrolmentId}`);
    const data = await res.json();

    if (!data) return;

    setStatus(data.status);

    const idx = steps.indexOf(data.status);
    const pct = Math.round(((idx + 1) / steps.length) * 100);

    setProgress(pct);

    if (pct >= 100 && !complete) {
      setComplete(true);
      const audio = document.getElementById('sound-complete') as HTMLAudioElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  useEffect(() => {
    fetchProgress();
    const interval = setInterval(fetchProgress, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <audio id="sound-complete" src="/celestial-chime.mp3" />

      <div
        className={`relative h-40 w-40 rounded-full flex items-center justify-center transition-all duration-700 ${
          complete ? 'shadow-[0_0_40px_10px_rgba(0,255,180,0.7)]' : 'shadow-none'
        }`}
      >
        <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-pulse" />

        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />

        <div className="absolute inset-0 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-emerald-300">{progress}%</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 capitalize">
        Current Status: {status}
      </p>
    </div>
  );
}
