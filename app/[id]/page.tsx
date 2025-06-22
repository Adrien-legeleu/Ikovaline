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
    alternates: {
      canonical: `https://ikovaline.com/${id}`,
    },
    robots: "index , follow"
  };
}

export default function Page({ params }: ParamsIdProps) {
  const { id } = params;

  return (
    <>
     
      <PageSquelette idAgence={id} />
    </>
  );
}
