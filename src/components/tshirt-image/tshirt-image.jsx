import styles from './tshirt-image.module.css';

const TShirtImage = ({source, onClick}) => {
    return <button className={styles.tShirtImage} onClick={onClick}>
       <img className={styles.tShirtImage__img} src={source} alt={"Картинка для футболки"}/>
    </button>
}

export default TShirtImage;