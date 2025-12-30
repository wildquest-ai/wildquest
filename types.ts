
export interface AnimalInfo {
  name: string;
  scientificName: string;
  location: string;
  status: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered' | 'Extinct in the Wild';
  caption: string;
  funFact: string;
}

export interface DiscoveryState {
  animal: AnimalInfo | null;
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}
