export interface Page {
  _id: string;
  pageTitle: string;
  pageSlug: {
    current: string;
    _type: string;
  };
  highlightPhrase: string;
  highlightImageUrl: string;
  pageContent: string;
  // isHomePage: boolean;
}
