import { RecoilRoot, RecoilEnv } from "recoil";
import "@/styles/globals.css";

import Layout from "./layout";

export default function App({ Component, pageProps }) {
  // Disable the duplicate atom key checking
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
