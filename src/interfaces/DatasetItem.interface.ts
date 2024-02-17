export interface DatasetItem {
  id?: number;
  name: string;
  workspace: number;
  project: number;
  dataset: number;
  type: string;
  url: string;
  value: string;
  annotations: string; //jsonb
}
