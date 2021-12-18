import Head from 'next/head'
import { useRouter } from 'next/router'
import { AES, enc } from 'crypto-js';
import { useRef, useState } from 'react';

export default function Home() {
  const [link , setLink] = useState(null)
  const [pass , setPass] = useState(null)
  const [encrypted, setEncrypted] = useState(null);

  const router = useRouter();
  return (
   <>
    <h1>Nara Link Locker</h1>
    <input type={"text"} 
    onChange={e => setLink(e.target.value)} 
    value={link} 
    placeholder='Enter your link'/>
    <input type={"password"} 
    onChange={e => setPass(e.target.value)} 
    value={pass} 
    placeholder='Enter your password'/>
    <button onClick={()=>{
        router.push({
          pathname:"/decrypt",
          query:{enc:encodeURIComponent(AES.encrypt(link, pass).toString())}
        })
    }}>Encrypt</button>
    <br/>
   </>
  )
}
