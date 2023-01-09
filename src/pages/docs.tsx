import { NextPage } from "next";
import Link from "next/link";

import Layout from "@components/Layout";

const DocsPage: NextPage = () => (
  <Layout>
    <Link href="/docs/project_outline.pdf">Project Outline</Link>
    <Link href="/docs/interim_report.pdf">Interim Report</Link>
    {/* <Link href="/docs/project_outline.pdf">Final Report</Link> */}
  </Layout>
);

export default DocsPage;
