import dynamic from 'next/dynamic';
import { dataAgenceGlobal } from '@/data/data-agence-global';

interface ParamsIdProps {
  params: {
    id: string;
  };
}

// ✅ Lazy-load de PageSquelette
const PageSquelette = dynamic(
  () => import('@/components/pageSatellite/PageSquelette'),
  {
    ssr: true, // tu veux que ça reste SEO friendly (donc SSR)
    loading: () => (
      <div className="h-screen flex items-center justify-center">
        Chargement...
      </div>
    ),
  }
);

export async function generateMetadata({ params }: ParamsIdProps) {
  const { id } = params;
  const data = dataAgenceGlobal.find((item) => item.id === id);

  if (!data) {
    return { title: 'Agence web - Ville inconnue' };
  }

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
