export interface Character {
  name: string;
  image: string;
  id: number;
}

export interface InfoInterface {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

export interface CharactersDataType {
  info?: InfoInterface;
  results?: Character[];
  status?: string;
  message?: string;
}

export interface CharacterInfinityDataType {
  pages: CharactersDataType;
}
