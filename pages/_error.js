import { useRouter } from "next/router";

export default function Error({ statusCode }) {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      <h1 className="text-4xl font-bold text-purple-600">MetaMask Auth</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops, something went wrong.{" "}
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <button
        className="mt-8 px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
        onClick={handleHome}
      >
        Go back home
      </button>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
