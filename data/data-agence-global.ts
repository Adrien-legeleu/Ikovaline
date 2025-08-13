import { dataAgence } from '@/data/data-agence';
import { dataAgenceHautsSeine } from './data-agence-hauts-de-seine';
import { dataAgenceSeineEtMarne } from './data-seine-et-marne';

export const dataAgenceGlobal = [
  ...dataAgence,
  ...dataAgenceHautsSeine,
  ...dataAgenceSeineEtMarne,
];
