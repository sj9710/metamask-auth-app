import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { address } = router.query;
    if (address) {
      setAddress(address);
      getNetwork();
    }
  }, [router.query]);

  const getNetwork = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = await detectEthereumProvider();
      if (provider) {
        const networkId = await provider.request({
          method: "net_version",
        });
        const networkName = getNetworkName(networkId);
        setNetwork(networkName);
      } else {
        setError("Please install MetaMask to use this app.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNetworkName = (id) => {
    switch (id) {
      case "1":
        return "Mainnet";
      case "137":
        return "Polygon";
      case "56":
        return "Binance";
      default:
        return "Unknown";
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      <h1 className="text-4xl font-bold text-purple-600">MetaMask Auth</h1>
      <p className="mt-4 text-lg text-gray-700">This is your profile page.</p>
      {loading ? (
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-lg text-red-600">{error}</p>
      ) : (
        <div className="mt-8 p-4 rounded-md bg-white shadow-lg">
          <p className="text-xl text-gray-700">
            Your wallet address is:{" "}
            <span className="font-mono text-purple-600">{address}</span>
          </p>
          <p className="mt-4 text-xl text-gray-700">
            Your current network is:{" "}
            <span className="font-mono text-purple-600">{network}</span>
          </p>
          <button
            className="mt-8 px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
