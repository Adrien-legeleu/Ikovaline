import { dataAgence } from '@/data/data-agence';
import { dataAgenceHautsSeine } from './data-agence-hauts-de-seine';
import { dataAgenceSeineEtMarne } from './data-seine-et-marne';
import { dataAgenceValDeMarne } from './data-agence-val-de-marne';
import { dataAgenceYvelines } from './data-agence-yvelines';
import { dataAgenceValOise } from './data-val-oise';
export const dataAgenceGlobal = [
  ...dataAgence,
  ...dataAgenceHautsSeine,
  ...dataAgenceSeineEtMarne,
  ...dataAgenceValDeMarne,
  ...dataAgenceYvelines,
  ...dataAgenceValOise,
];
