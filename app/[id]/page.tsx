import PageSquelette from '@/components/pageSatellite/PageSquelette';
import { dataAgenceGlobal } from '@/data/data-agence-global';

interface ParamsIdProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ParamsIdProps) {
  const { id } = params;
  const data = dataAgenceGlobal.find((item) => item.id === id);
  if (!data) return { title: 'Agence web - Ville inconnue' };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://ikovaline.com/${id}`,
    },
    robots: 'index, follow',
  };
}

export default function Page({ params }: ParamsIdProps) {
  const { id } = params;
  return <PageSquelette idAgence={id} />;
}
