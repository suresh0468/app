export interface Verse {
  id: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  transliteration?: string;
  meaning: string;
  explanation: string;
  images: any[];
}

export interface Chapter {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image?: any;
  versesCount?: number;
}
