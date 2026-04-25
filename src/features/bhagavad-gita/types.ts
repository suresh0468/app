export interface Verse {
  id: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  transliteration?: string;
  meaning?: string;
  wordMeanings?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image?: any;
  versesCount?: number;
}
