import styles from './HighlightPhrase.module.css';
// import { urlFor } from '../../utils/buildSanityImageUrl';

interface HighlightPhraseProps {
  phrase: string;
}

function HighlightPhrase({ phrase }: HighlightPhraseProps) {
  return (
    <p className={ styles.container_highlight_phrase }>
      { phrase }
    </p>
  );
}

export default HighlightPhrase;
