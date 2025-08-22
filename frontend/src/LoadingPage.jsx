import { useEffect, useState } from "react";

export default function LoadingPage({ onReady }) {
  const [status, setStatus] = useState("Checking CrickIntel backend...");

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE || "https://s84-kartikay-crickintel.onrender.com"}/api/health`);
        const data = await res.json();

        if (res.ok) {
          setStatus("✅ Backend is ready! Redirecting...");
          setTimeout(() => onReady(), 1000); // move to main site
        } else {
          setStatus("⚠️ Server not ready, retrying...");
          setTimeout(pingBackend, 2000);
        }
      } catch (err) {
        setStatus("❌ Cannot reach server, retrying...");
        setTimeout(pingBackend, 2000);
      }
    };

    pingBackend();
  }, [onReady]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">🏏 CrickIntel</h1>
        <p className="mb-4">{status}</p>
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
