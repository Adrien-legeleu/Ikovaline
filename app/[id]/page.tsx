import PageSquelette from "@/components/pageSatellite/PageSquelette";
import { dataAgence } from "@/data/data-agence";

export async function generateMetadata({ params }: any) {
  const { id } = params;
  const data = dataAgence.find((item) => item.id === id);
  if (!data) return { title: "Agence web - Ville inconnue" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

interface ParamsIdProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: ParamsIdProps) {
  const { id } = params;

  return <PageSquelette idAgence={id} />;
}
