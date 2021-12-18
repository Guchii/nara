import Head from 'next/head'
import { useRouter } from 'next/router'
import { AES, enc } from 'crypto-js';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const finalRef = useRef(null);
  const [pass , setPass] = useState(null)
  const [encrypted, setEncrypted] = useState(null);
  const router = useRouter();
  useEffect(()=>{
      setEncrypted(decodeURIComponent(router.query.enc));
  }, [router.query.enc]);
  return (
   <>
    <h1>Nara Link Locker</h1>
    <input type={"password"} 
    onChange={e => setPass(e.target.value)} 
    value={pass}
    placeholder='Enter your password'/>
    <button onClick={()=>{
        setEncrypted(AES.decrypt(encrypted, pass).toString(enc.Utf8));
    }}>Decrypt</button>
    <br/>
    <span>{pass}</span>
    <br/><span>{encrypted || "nice"}</span>
   </>
  )
}
