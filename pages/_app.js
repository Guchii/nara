import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex flex-col justify-between items-center min-h-screen min-w-screen bg-green-200">
        <div></div>
        <Component {...pageProps} />
        <h1 className="text-7xl font-bold text-center p-5 cursor-default">
          Nara
        </h1>
      </div>
      {/* <div className="bg-slate-800 text-white -rotate-90 w-40 absolute top-40 right-0">
        star nara on github
      </div> */}
    </>
  );
}

export default MyApp;
