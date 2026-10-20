export type CalculationMode = 'density' | 'mass' | 'volume' | 'buoyancy' | 'mixture';

export type SubstanceState = 'solid' | 'liquid' | 'gas';
export type SubstanceCategory = 'metal' | 'nonmetal' | 'building' | 'liquid' | 'gas' | 'daily' | 'custom';

export type DensityUnit = 'g/cm³' | 'kg/m³' | 'g/mL' | 'kg/L' | 'mg/cm³' | 'lb/ft³' | 'lb/in³' | 'oz/in³';
export type MassUnit = 'kg' | 'g' | 'mg' | 't' | 'lb' | 'oz';
export type VolumeUnit = 'm³' | 'dm³' | 'cm³' | 'mm³' | 'L' | 'mL' | 'ft³' | 'in³' | 'gal';

export interface Substance {
  id: string;
  name: string;
  nameEn: string;
  formula?: string;
  state: SubstanceState;
  category: SubstanceCategory;
  density: number; // in g/cm³
  densitySI: number; // in kg/m³
  condition: string;
  conditionEn?: string;
  description: string;
  descriptionEn?: string;
  color: string;
  isCustom?: boolean;
}

export interface CalculationResult {
  mode: CalculationMode;
  densityGcm3: number;
  densitySI: number;
  massG: number;
  massSI: number;
  volumeCm3: number;
  volumeSI: number;
  selectedUnits: {
    density: DensityUnit;
    mass: MassUnit;
    volume: VolumeUnit;
  };
  displayValues: {
    density: number;
    mass: number;
    volume: number;
  };
  steps: CalculationStep[];
  timestamp: number;
}

export interface CalculationStep {
  title: string;
  formula: string;
  substitutions: string;
  result: string;
  note?: string;
}

export interface MixtureComponent {
  id: string;
  name: string;
  mass: number;
  massUnit: MassUnit;
  density: number;
  densityUnit: DensityUnit;
  volume: number;
  volumeUnit: VolumeUnit;
  knownBy: 'mass-density' | 'volume-density' | 'mass-volume';
}

export interface BuoyancySimulationState {
  objectDensity: number; // in g/cm³
  liquidDensity: number; // in g/cm³
  objectVolume: number; // in cm³
  gravity: number; // 9.8 or 10 N/kg
  liquidName: string;
  objectName: string;
}
