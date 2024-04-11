export interface Page {
  _id: string;
  pageTitle: string;
  pageSlug: {
    current: string;
    _type: string;
  };
  highlightPhrase: string;
  highlightImageUrl: string;
  pageContent: Block[];
  video?: {
    youtubeId: string;
  };
  footerImage: string;
  // isHomePage: boolean;
}

interface Block {
  _type: string;
  children: {
    _type: string;
    text: string;
  }[];
}
