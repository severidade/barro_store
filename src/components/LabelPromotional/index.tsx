import styles from './LabelPromotional.module.css';

interface LabelPromotionalProps {
  off: number;
}

// eslint-disable-next-line max-len
function LabelPromotional({ off }: LabelPromotionalProps) {
  return (
    <div className={ styles.label_promotional }>
      <em className={ styles.percentage_discount }>
        {off}
        %
      </em>
      <strong className={ styles.off }>OFF</strong>
    </div>
  );
}

export default LabelPromotional;
