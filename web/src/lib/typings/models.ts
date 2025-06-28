export interface RawPedModel {
  Name: string;
  TranslatedDirectorName?: { English: string };
}

export interface PedModel {
  Name: string;
  Label?: string;
  Image?: string;
}
