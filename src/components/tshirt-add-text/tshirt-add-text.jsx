import {useState} from "react";
import styles from './tshirt-add-text.module.css';

const TShirtAddText = ({addText}) => {
    const [text, setText] = useState("");
    return (
        <div className={styles.tShirtAddText}>
        <textarea className={"form-text"} value={text} onInput={e => setText(e.target.value)}/>
        <button className={"btn btn-primary"} onClick={() => addText(text)}>Добавить</button>
        </div>
    );
}

export default TShirtAddText;