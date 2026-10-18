export type RonerCategory =
  | 'Todas'
  | 'Carnes'
  | 'Pescado'
  | 'Marisco'
  | 'Verduras y Hortalizas'
  | 'Legumbres y Cereales'
  | 'Fruta';

export type RonerMeatFilter = 'Todas' | 'Directas' | 'Indirectas';

export interface RonerCookingOption {
  temperatureC: number;
  time: string;
  notes?: string;
}

export interface RonerEntry {
  id: string;
  name: string;
  category: Exclude<RonerCategory, 'Todas'>;
  portionOrWeight?: string;
  mode?: 'Directa' | 'Indirecta';
  options: RonerCookingOption[];
  searRecommended?: boolean;
  notes?: string;
}

export interface RocookGeneralRule {
  id: string;
  title: string;
  shortText: string;
  detail: string;
  iconName: string;
}
