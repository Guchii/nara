import Head from "next/head";
import { useRouter } from "next/router";
import { AES, enc } from "crypto-js";
import { useEffect, useState } from "react";
import copy from "clipboard-copy";

export default function Home() {
  const [pass, setPass] = useState(null);
  const [encrypted, setEncrypted] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setEncrypted(decodeURIComponent(router.query.enc));
  }, [router.query.enc]);
  const handler = () => {
    const final = AES.decrypt(encrypted, pass).toString(enc.Utf8);
    window.open(final, "_self");
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
              className="bg-gray-500 p-3 text-gray-100 rounded-full"
              disabled
            >
              short
            </button>
          </div>
        )}
      </div>
    </>
  );
}
