import TShirtImage from "../tshirt-image/tshirt-image";
import styles from "./tshirt-images.module.css";

const TShirtImages = ({images, addImage}) => {
    return (
        <div className={styles.tShirtImages}>
            {images.map((image, index) => {
                return (<TShirtImage key={index} source={image} onClick={() => addImage(images[index])}/>)
            })}
        </div>
    )
}

export default TShirtImages;