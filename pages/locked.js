import Head from "next/head";
import { useRouter } from "next/router";
import { AES, enc } from "crypto-js";
import { useEffect, useState } from "react";
import copy from "clipboard-copy";

const Locked = () => {
  const [pass, setPass] = useState(null);
  const [encrypted, setEncrypted] = useState(null);
  const [fetched, setFetched] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setEncrypted(decodeURIComponent(router.query.enc));
  }, [router.query.enc]);
  const handler = () => {
    const final = AES.decrypt(encrypted, pass).toString(enc.Utf8);
    window.open(final, "_self");
  };
  const shortner = async (url) => {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const { result } = await res.json();
    const { full_short_link } = result;
    copy(full_short_link);
    setFetched(true);
    setTimeout(() => setFetched(false), 3000);
  };
  return (
    <>
      <Head>
        <title>This link has been locked</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="text-center">
          <h2 className="font-bold text-4xl">This link has been locked</h2>
          <p>Please enter a password to continue</p>
        </div>
        <input
          type={"password"}
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          className="bg-slate-500 text-white rounded-full p-3 placeholder:text-white duration-150 indent-2"
          placeholder="🔑 Enter password ⏎"
          onKeyPress={(e) => {
            e.key === "Enter" && handler();
          }}
        />
        {router.query.ref === "index" && (
          <div className="font-medium flex items-center gap-2 justify-center">
            <button
              className="bg-pink-700 p-3 text-white rounded-full"
              onClick={() => {
                const url = new URL(window.location);
                copy(
                  location.protocol +
                    "//" +
                    location.host +
                    location.pathname +
                    "?enc=" +
                    url.searchParams.get("enc")
                );
              }}
            >
              long
            </button>
            <p>&lt; copy link &gt;</p>
            <button
              className="bg-purple-500 p-3 text-white rounded-full"
              onClick={() => {
                const url = new URL(window.location);
                shortner(
                  location.protocol +
                    "//" +
                    (location.host === "localhost:3000"
                      ? "narall.surge.sh"
                      : location.host) +
                    location.pathname +
                    "?enc=" +
                    url.searchParams.get("enc")
                );
              }}
            >
              short
            </button>
          </div>
        )}
        {fetched && (
          <span>
            🔗 Link fetched from the shrtco.de api and copied to 📋 clipboard.
          </span>
        )}
      </div>
    </>
  );
};

export default Locked;
