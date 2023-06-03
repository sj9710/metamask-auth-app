import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      setError("Please install MetaMask to use this app.");
    }
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        router.push(`/profile?address=${accounts[0]}`);
      } else {
        setError("Please install MetaMask to use this app.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      <h1 className="text-4xl font-bold text-purple-600">MetaMask Auth</h1>
      <p className="mt-4 text-lg text-gray-700">
        Connect your MetaMask wallet to see your profile.
      </p>
      <button
        className="mt-8 px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect Wallet"}
      </button>
      {error && <p className="mt-4 text-lg text-red-600">{error}</p>}
    </div>
  );
}
    