import Head from "next/head";
import { useRouter } from "next/router";
import { AES } from "crypto-js";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState(null);
  const [pass, setPass] = useState(null);
  const router = useRouter();
  const handler = () => {
    router.push({
      pathname: "/locked",
      query: {
        enc: encodeURIComponent(AES.encrypt(link, pass).toString()),
        ref: "index"
      }
    });
  };
  return (
    <>
      <Head>
        <title>Password Protect your Links with Nara</title>
        <meta
          name="description"
          content="Enter your Link and Password in their respective fields, then press Enter."
        />
      </Head>
      <section className="flex flex-col justify-center items-center gap-10">
        <div className="text-center">
          <h2 className="font-bold text-4xl">
            Password Protect your Links with Nara
          </h2>
          <p>
            Enter your Link and Password in their respective fields, then press
            Enter.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 w-48">
          <input
            type={"text"}
            onChange={(e) => setLink(e.target.value)}
            value={link}
            placeholder="🔗 Enter your link ⭾"
            className="bg-slate-500 text-white rounded-full p-3 placeholder:text-white duration-150 indent-2"
          />
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
        </div>
      </section>
    </>
  );
}
