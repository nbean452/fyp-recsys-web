import type { NextPage } from "next";
import Link from "next/link";

import Layout from "@components/Layout";

const DocsPage: NextPage = () => (
  <Layout>
    <Link href="/docs/project-outline.pdf">Project Outline</Link>
    <Link href="/docs/interim-report.pdf">Interim Report</Link>
    <Link href="/docs/final-report.pdf">Final Report</Link>
  </Layout>
);

export default DocsPage;
