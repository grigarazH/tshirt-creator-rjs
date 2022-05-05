import styles from './panel.module.css';

const Panel = ({children}) => (<div className={styles.panel}>{children}</div>);

export default Panel;