import BlockContent from '@sanity/block-content-to-react';
import HighlightImage from '../HighlightImage';
import styles from './HomeWorkingHours.module.css';

interface HomeWorkingHoursProps {
  url: string;
  phrase: string;
  content: any[];
}

function HomeWorkingHours({ url, phrase, content }: HomeWorkingHoursProps) {
  return (
    <section className={ styles.working_hours }>
      <div className={ styles.content_working_hours }>
        <HighlightImage
          imageUrl={ url }
          imageType="working_hours_image"
        />
        <h2 className={ styles.highlight_phrase_home }>{ phrase}</h2>
        <BlockContent blocks={ content } />
      </div>
    </section>
  );
}

export default HomeWorkingHours;
