import styles from "./tshirt-edit-image.module.css";

const TShirtEditImage = props => {
    return (
        <div className={styles.tShirtEditImage}>
            <button className={"btn btn-primary"} onClick={props.bringToFrontClick}>Переместить вперед</button>
            <button className={"btn btn-primary"} onClick={props.sendToBackClick}>Переместить назад</button>
            <button className={"btn btn-danger"} onClick={props.removeObjectClick}>Удалить</button>
        </div>
    )
}

export default TShirtEditImage;