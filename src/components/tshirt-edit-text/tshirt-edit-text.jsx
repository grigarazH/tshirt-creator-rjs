import styles from "./tshirt-edit-text.module.css";
import boldIcon from '../../images/icons/font_bold.png';
import italicIcon from '../../images/icons/font_italic.png';
import strikeIcon from '../../images/icons/font_strikethrough.png';
import underlineIcon from '../../images/icons/font_underline.png';
import {SketchPicker} from "react-color";
import {useState} from "react";
import {Dropdown, ThemeProvider} from "react-bootstrap";


const TShirtEditText = (props) => {
    const [textColorPickerActive, setTextColorPickerActive] = useState(false);
    const [strokeColorPickerActive, setStrokeColorPickerActive] = useState(false);
   return (
       <div className={styles.tShirtEditText}>
           {props.text && (
               <>
                   <label htmlFor={"edit-text-text"}>Текст</label>
                   <textarea value={props.text.text} onInput={props.onTextInput}></textarea>
                   <label htmlFor={"edit-text-font"}>Шрифт</label>
                   {/*<select id={"edit-text-font"} name={"edit-text-font"} value={props.text.fontFamily} onChange={props.onFontChange}>*/}
                   {/*    <option value={"Arial"}>Arial</option>*/}
                   {/*    <option value={"Helvetica"}>Helvetica</option>*/}
                   {/*    <option value={"Myriad Pro"}>Myriad Pro</option>*/}
                   {/*    <option value={"Delicious"}>Delicious</option>*/}
                   {/*    <option value={"Verdana"}>Verdana</option>*/}
                   {/*    <option value={"Georgia"}>Georgia</option>*/}
                   {/*    <option value={"Courier"}>Courier</option>*/}
                   {/*    <option value={"Comic Sans MS"}>Comic Sans MS</option>*/}
                   {/*    <option value={"Impact"}>Impact</option>*/}
                   {/*    <option value={"Monaco"}>Monaco</option>*/}
                   {/*    <option value={"Optima"}>Optima</option>*/}
                   {/*    <option value={"Hoefler Text"}>Hoefler Text</option>*/}
                   {/*    <option value={"Plaster"}>Plaster</option>*/}
                   {/*    <option value={"Engagement"}>Engagement</option>*/}
                   {/*</select>*/}
                   <ThemeProvider prefixes={{btn: "font-dropdown-button", "dropdown-toggle": "settings-dropdown-toggle"}}>
                       <Dropdown>
                           <Dropdown.Toggle className={"form-select"} style={{fontFamily: props.text.fontFamily}}>
                               {props.text.fontFamily}
                           </Dropdown.Toggle>
                           <Dropdown.Menu className={styles.tShirtEditText__dropdown}>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Arial")} style={{fontFamily: "Arial"}}>Arial</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Helvetica")} style={{fontFamily: "Helvetica"}}>Helvetica</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Myriad Pro")} style={{fontFamily: "Myriad Pro"}}>Myriad Pro</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Delicious")} style={{fontFamily: "Delicious"}}>Delicious</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Verdana")} style={{fontFamily: "Verdana"}}>Verdana</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Georgia")} style={{fontFamily: "Georgia"}}>Georgia</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Courier")} style={{fontFamily: "Courier"}}>Courier</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Comic Sans MS")} style={{fontFamily: "Comic Sans MS"}}>Comic Sans MS</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Impact")} style={{fontFamily: "Impact"}}>Impact</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Monaco")} style={{fontFamily: "Monaco"}}>Monaco</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Optima")} style={{fontFamily: "Optima"}}>Optima</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Hoefler Text")} style={{fontFamily: "Hoefler Text"}}>Hoefler Text</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Plaster")} style={{fontFamily: "Plaster"}}>Plaster</Dropdown.Item>
                               <Dropdown.Item as={"button"} onClick={() => props.onFontChange("Engagement")} style={{fontFamily: "Engagement"}}>Engagement</Dropdown.Item>
                           </Dropdown.Menu>
                       </Dropdown>
                   </ThemeProvider>
                   <label htmlFor={"edit-text-fontsize"}>Размер шрифта</label>
                   <input value={props.text.fontSize} id={"edit-text-fontsize"} name={"edit-text-fontsize"} type={"range"} min={8} max={80} onInput={props.onFontSizeInput}/>
                   <label htmlFor={"edit-text-lineheight"}>Высота строки</label>
                   <input value={props.text.lineHeight} id={"edit-text-lineheight"} name={"edit-text-lineheight"} type={"range"} min={0.5} max={3.0} step={0.05} onInput={props.onLineHeightInput}/>
                   <label htmlFor={"edit-text-spacing"}>Межсимвольный интервал</label>
                   <input value={props.text.charSpacing} id={"edit-text-spacing"} name={"edit-text-spacing"} type={"range"} min={-30} max={100} onInput={props.onSpacingInput}/>
                   <div>
                       <button className={`${styles.fontIcon} ${props.text.fontWeight === "bold" && styles.fontIcon_active}`} onClick={props.onBoldClick}><img src={boldIcon}/></button>
                       <button className={`${styles.fontIcon} ${props.text.fontStyle === "italic" && styles.fontIcon_active}`} onClick={props.onItalicClick}><img src={italicIcon}/></button>
                       <button className={`${styles.fontIcon} ${props.text.underline && styles.fontIcon_active}`} onClick={props.onUnderlineClick}><img src={underlineIcon}/></button>
                       <button className={`${styles.fontIcon} ${props.text.linethrough && styles.fontIcon_active}`} onClick={props.onStrikeClick}><img src={strikeIcon}/></button>
                   </div>
                   <div className={styles.textColors}>
                       <span className={styles.colorButtonContainer}>
                           <label htmlFor={"edit-text-textcolorbutton"}>Цвет текста</label>
                           <button id={"edit-text-textcolorbutton"} name={"edit-text-textcolorbutton"} className={styles.colorButton} style={{background: props.text.fill}} onClick={() => {
                               setTextColorPickerActive(!textColorPickerActive);
                               setStrokeColorPickerActive(false);
                           }}/>
                       </span>
                       <div className={`${styles.picker} ${textColorPickerActive && styles.picker_active}`}>
                           <div className={styles.picker__cover} onClick={() => setTextColorPickerActive(false)}/>
                           <SketchPicker color={props.text.fill} onChange={props.onTextColorChange}/>
                       </div>
                       <span className={styles.colorButtonContainer}>
                       <label htmlFor={"edit-text-strokecolorbutton"}>Обводка</label>
                       <button id={"edit-text-strokecolorbutton"} name={"edit-text-strokecolorbutton"}
                               className={styles.colorButton} style={{background: props.text.stroke}} onClick={() => {
                           setTextColorPickerActive(false);
                           setStrokeColorPickerActive(!strokeColorPickerActive);
                       }}/>
                       </span>
                       <div className={`${styles.picker} ${strokeColorPickerActive && styles.picker_active}`}>
                           <div className={styles.picker__cover} onClick={(e) => {
                               setStrokeColorPickerActive(false);
                           }}/>
                           <SketchPicker color={props.text.stroke ? props.text.stroke : ""} onChange={props.onStrokeColorChange}/>
                           <button className={"btn btn-danger"} style={{zIndex: 2}} onClick={() => {
                               props.onResetStrokeClick();
                               setStrokeColorPickerActive(false);
                           }}>Сброс</button>
                       </div>

                   </div>

                   <button className={"btn btn-primary"} onClick={props.bringToFrontClick}>Переместить вперед</button>
                   <button className={"btn btn-primary"} onClick={props.sendToBackClick}>Переместить назад</button>
                   <button className={"btn btn-danger"} onClick={props.removeObjectClick}>Удалить</button>
               </>
       )}
       </div>
    );
};

export default TShirtEditText;