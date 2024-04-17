import styles from './LabelPromotional.module.css';

interface LabelPromotionalProps {
  // promotionalData: { isPromotional: boolean; discount: number; } | null;
  // isPromotional: boolean;
  off: number;
}

// eslint-disable-next-line max-len
function LabelPromotional({ off }: LabelPromotionalProps) {
  // Verifica se promotionalData não é null e se isPromotional é verdadeiro
  return (
    <div className={ styles.label_promotional }>
      {off}
      %
      <strong>off</strong>
    </div>
  );
}

export default LabelPromotional;
