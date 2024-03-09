export interface Label {
  id: string;
  name: string;
  color: string;
  description: string;
  prompts: string[];
}

export interface Ontology {
  id: string;
  name: string;
  description: string;
  labels: string; // jsonb Label[]
}

export interface DatasetSettings {
  id?: number;
  dataset: number;
  ontology: string; //jsonb;
}
