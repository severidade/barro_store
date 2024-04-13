import styles from './MainTitle.module.css';

interface MainTitleProps {
  title: string;
}

function MainTitle({ title }: MainTitleProps) {
  return (
    <h1 className={ styles.main_title }>
      {title.split(' ').map((word, index) => {
        if (index === 0) {
          return (
            <span key={ index }>
              <strong>{word}</strong>
              {' '}
            </span>
          );
        }
        return `${word} `;
      })}
    </h1>
  );
}

export default MainTitle;
