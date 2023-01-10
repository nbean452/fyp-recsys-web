import { NextPage } from "next";
import Link from "next/link";

import Layout from "@components/Layout";

const DocsPage: NextPage = () => (
  <Layout>
    <Link href="/docs/project_outline.pdf">Project Outline</Link>
    <Link href="/docs/interim_report.pdf">Interim Report</Link>
    {/* //TODO: Add final report when available */}
    {/* <Link href="/docs/final_report.pdf">Final Report</Link> */}
  </Layout>
);

export default DocsPage;
