import {SketchPicker} from "react-color";
import {useContext, useEffect, useState} from "react";
import styles from './tshirt-settings.module.css';
import {SettingsContext} from "../../services/appContext";
import {Dropdown, DropdownButton, ThemeProvider} from "react-bootstrap";

const TShirtSettings = () => {
    const {settings, setSettings} = useContext(SettingsContext);
    return (
        <div className={styles.tShirtSettings}>
            <ThemeProvider prefixes={{btn: "settings-dropdown-button", "dropdown-toggle": "settings-dropdown-toggle"}}>
                <Dropdown>
                    <Dropdown.Toggle className={"form-select"}>
                        {settings.type === "crew" && "Футболки"}
                        {settings.type === "longsleeve" && "Кофты с длинным рукавом"}
                        {settings.type === "hoodie" && "Толстовки с капюшоном"}
                        {settings.type === "tanktop" && "Майки"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={styles.tShirtSettings__dropdown}>
                        <Dropdown.Item as={"button"} onClick={() => setSettings({...settings, type: "crew"})}>Футболки</Dropdown.Item>
                        <Dropdown.Item as={"button"} onClick={() => setSettings({...settings, type: "longsleeve"})}>Кофты с длинным рукавом</Dropdown.Item>
                        <Dropdown.Item as={"button"} onClick={() => setSettings({...settings, type: "hoodie"})}>Толстовки с капюшоном</Dropdown.Item>
                        <Dropdown.Item as={"button"} onClick={() => setSettings({...settings, type: "tanktop"})}>Майки</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ThemeProvider>

            <div className={styles.picker}><SketchPicker color={settings.color} onChange={color => setSettings({...settings, color: color.hex})}/></div>
        </div>
    );
}

export default TShirtSettings;