import { RecoilRoot, RecoilEnv } from "recoil";
import "@/styles/globals.css";

import Layout from "./layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  // Disable the duplicate atom key checking
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <div>
      <RecoilRoot>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" sizes="24px" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </div>
  );
}
