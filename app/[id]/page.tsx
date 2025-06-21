import PageSquelette from "@/components/pageSatellite/PageSquelette";
import { dataAgence } from "@/data/data-agence";
import Head from "next/head";

interface ParamsIdProps {
  params: {
    id: string;
  };
}
export async function generateMetadata({ params }: ParamsIdProps) {
  const { id } = params;
  const data = dataAgence.find((item) => item.id === id);
  if (!data) return { title: "Agence web - Ville inconnue" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default function Page({ params }: ParamsIdProps) {
  const { id } = params;

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://ikovaline.com/${id}`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <PageSquelette idAgence={id} />
    </>
  );
}
