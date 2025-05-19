export interface InstructionSet {
  id: string;
  title: string;
  retailer: string;
  instructions: Instruction[];
  skuPrefixes: string[];
}

export interface Instruction {
  id: string;
  english: string;
  spanish: string;
  imageUrl?: string;
}