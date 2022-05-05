import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fabric} from "fabric";
import {FabricJSCanvas, useFabricJSEditor} from "fabricjs-react";
import TShirtSettings from "./components/tshirt-settings/tshirt-settings";
import Tab from "./components/tab/tab";
import Panel from "./components/panel/panel";
import TShirtImagePicker from "./components/tshirt-image-picker/tshirt-image-picker";
import {useCallback, useEffect, useState} from "react";
import crewFront from './images/shirts/crew_front.png';
import hoodieFront from './images/shirts/mens_hoodie_front.png';
import longsleeveFront from './images/shirts/mens_longsleeve_front.png';
import tankFront from './images/shirts/mens_tank_front.png';
import crewBack from './images/shirts/crew_back.png';
import hoodieBack from './images/shirts/mens_hoodie_back.png';
import longsleeveBack from './images/shirts/mens_longsleeve_back.png';
import tankBack from './images/shirts/mens_longsleeve_back.png';
import {SettingsContext} from "./services/appContext";
import TShirtAddText from "./components/tshirt-add-text/tshirt-add-text";
import TShirtEditText from "./components/tshirt-edit-text/tshirt-edit-text";
import TShirtEditImage from "./components/tshirt-edit-image/tshirt-edit-image";
import {Button, Form} from "react-bootstrap";

function App(props) {
    const [currentTab, setCurrentTab] = useState("settings");
    const [lastTab, setLastTab] = useState("settings");
    const [settings, setSettings] = useState({color: "#fff", type: "crew"});
    const [frontShirt, setFrontShirt] = useState("");
    const [backShirt, setBackShirt] = useState("");
    const [selectedText, setSelectedText] = useState({});
    const [side, setSide] = useState("front");
    const {selectedObjects, editor, onReady} = useFabricJSEditor();
    const addText = useCallback((text) => {
        const textObj = new fabric.Text(text);
        editor.canvas.add(textObj);
    }, [editor]);

    const setTab = useCallback((tab) => {
        editor.canvas.discardActiveObject().renderAll();
        setCurrentTab(tab);
        setLastTab(tab);
    }, [editor]);

    const addImage = useCallback((image) => {
        const extension = image.split('.').pop();
        if(extension === "svg") {
            fabric.loadSVGFromURL(image, (objects, options) => {
                let svgData = fabric.util.groupSVGElements(objects, options);
                editor.canvas.add(svgData);
            });
        } else {
            fabric.Image.fromURL(image, (img) => {
               editor.canvas.add(img);
            });
        }

    }, [editor]);

    const addImageFromFile = useCallback((file) => {
        const img = new fabric.Image(file);
        editor.canvas.add(img)
    }, [editor]);

    const onSpacingInput = useCallback(e => {
        const text = selectedObjects[0];
        text.set("charSpacing", e.target.value);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, charSpacing: selectedObjects[0].charSpacing});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnFontChange = useCallback(value => {
        const text = selectedObjects[0];
        text.set("fontFamily", value);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, fontFamily: selectedObjects[0].fontFamily});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnTextInput = useCallback(e => {
        const text = selectedObjects[0];
        text.set("text", e.target.value);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, text: selectedObjects[0].text});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnFontSizeInput = useCallback(e => {
        const text = selectedObjects[0];
        text.set("fontSize",e.target.value);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, fontSize: selectedObjects[0].fontSize})
    }, [editor, selectedObjects, selectedText]);

    const editTextOnLineHeightInput = useCallback(e => {
        const text = selectedObjects[0];
        text.set("lineHeight", e.target.value);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, lineHeight: selectedObjects[0].lineHeight})
    }, [editor, selectedObjects, selectedText]);

    const editTextOnBoldClick = useCallback(e => {
       const text = selectedObjects[0];
       if(text.fontWeight === "bold") {
           text.set("fontWeight", "normal");
       } else {
           text.set("fontWeight", "bold");
       }
        editor.canvas.requestRenderAll();
       setSelectedText({...selectedText, fontWeight: selectedObjects[0].fontWeight});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnItalicClick = useCallback(e => {
        const text = selectedObjects[0];
        if(text.fontStyle === "italic") {
            text.set("fontStyle", "normal");
        } else {
            text.set("fontStyle", "italic");
        }
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, fontStyle: selectedObjects[0].fontStyle});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnUnderlineClick = useCallback(e => {
        const text = selectedObjects[0];
        text.set("underline",!text.underline);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, underline: selectedObjects[0].underline});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnStrikeClick = useCallback(e => {
        const text = selectedObjects[0];
        text.set("linethrough",!text.linethrough);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, linethrough: selectedObjects[0].linethrough});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnTextColorChange = useCallback(color => {
       const text = selectedObjects[0];
       text.set("fill", color.hex);
       editor.canvas.requestRenderAll();
       setSelectedText({...selectedText, fill: selectedObjects[0].fill});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnStrokeColorChange = useCallback(color => {
        const text = selectedObjects[0];
        text.set("stroke", color.hex);
        editor.canvas.requestRenderAll();
        setSelectedText({...selectedText, stroke: selectedObjects[0].stroke});
    }, [editor, selectedObjects, selectedText]);

    const editTextOnResetStrokeClick = useCallback(() => {
        console.log("reset stroke click)");
       const text = selectedObjects[0];
       text.set("stroke", "");
       editor.canvas.requestRenderAll();
       setSelectedText({...selectedText, stroke: selectedObjects[0].stroke});
    }, [editor, selectedObjects, selectedText]);

    const bringToFrontClick = useCallback(() => {
       editor.canvas.bringToFront(selectedObjects[0]);
       editor.canvas.requestRenderAll();
    }, [editor, selectedObjects]);

    const sendToBackClick = useCallback(() => {
       editor.canvas.sendToBack(selectedObjects[0]);
       editor.canvas.requestRenderAll();
    }, [editor, selectedObjects]);

    const removeObjectClick = useCallback(() => {
       editor.canvas.remove(selectedObjects[0]);
       editor.canvas.requestRenderAll();
       setCurrentTab(lastTab);
    }, [editor, selectedObjects, lastTab]);

    const changeSides = useCallback(() => {
        if(side === "front") {
            setFrontShirt(JSON.stringify(editor.canvas));
            editor.canvas.clear();
            if(backShirt) {
                editor.canvas.loadFromJSON(backShirt);
            }
            setSide("back");
        } else {
            setBackShirt(JSON.stringify(editor.canvas));
            editor.canvas.clear();
            if(frontShirt) {
                editor.canvas.loadFromJSON(frontShirt);
            }
            setSide("front");
        }
    }, [backShirt, frontShirt, editor, side]);

    useEffect(() => {
        if(selectedObjects.length === 1) {
            if(selectedObjects[0].type === "text") {
                setCurrentTab("editText");
                setSelectedText({
                    text: selectedObjects[0].text,
                    fontFamily: selectedObjects[0].fontFamily,
                    charSpacing: selectedObjects[0].charSpacing,
                    fontSize: selectedObjects[0].fontSize,
                    lineHeight: selectedObjects[0].lineHeight,
                    fontWeight: selectedObjects[0].fontWeight,
                    fontStyle: selectedObjects[0].fontStyle,
                    underline: selectedObjects[0].underline,
                    linethrough: selectedObjects[0].linethrough,
                    fill: selectedObjects[0].fill,
                    stroke: selectedObjects[0].stroke,
                    shadow: selectedObjects[0].shadow,
                });
            }else {
                setCurrentTab("editImage");
            }
        } else {
            setCurrentTab(lastTab);
        }
    }, [selectedObjects]);
  return (
      <SettingsContext.Provider value={{settings, setSettings}}>
          <div className={"App"}>
              <div className="content">
                  <div className={"panel"}>
                      <ul className={"nav nav-tabs"}>
                          <Tab active={currentTab === "settings"} onClick={() => setTab("settings")}>Свойства футболки</Tab>
                          <Tab active={currentTab === "pics"} onClick={() => setTab("pics")}>Картинки</Tab>
                          <Tab active={currentTab === "text"} onClick={() => setTab("text")}>Текст</Tab>
                      </ul>
                      {currentTab === "settings" && <Panel><TShirtSettings/></Panel>}
                      {currentTab === "pics" && <Panel><TShirtImagePicker addImage={addImage} addImageFromFile={addImageFromFile}/> </Panel>}
                      {currentTab === "text" && <Panel><TShirtAddText addText={addText}/> </Panel>}
                      {currentTab === "editText" && <Panel><TShirtEditText
                          text={selectedText}
                          onSpacingInput={onSpacingInput}
                          onTextInput={editTextOnTextInput}
                          onFontChange={editTextOnFontChange}
                          onFontSizeInput={editTextOnFontSizeInput}
                          onLineHeightInput={editTextOnLineHeightInput}
                          onBoldClick={editTextOnBoldClick}
                          onItalicClick={editTextOnItalicClick}
                          onUnderlineClick={editTextOnUnderlineClick}
                          onStrikeClick={editTextOnStrikeClick}
                          onTextColorChange={editTextOnTextColorChange}
                          onStrokeColorChange={editTextOnStrokeColorChange}
                          onResetStrokeClick={editTextOnResetStrokeClick}
                          bringToFrontClick={bringToFrontClick}
                          sendToBackClick={sendToBackClick}
                          removeObjectClick={removeObjectClick}/></Panel>}
                      {currentTab === "editImage" && <Panel><TShirtEditImage
                          bringToFrontClick={bringToFrontClick}
                          sendToBackClick={sendToBackClick}
                          removeObjectClick={removeObjectClick}
                      /></Panel>}
                      <button className={"btn btn-primary"} onClick={changeSides}>Перевернуть</button>
                      <button className={"btn btn-primary"} onClick={() => {
                      }}>Купить</button>

                  </div>
                  <div className={"canvasContainer"} style={{backgroundColor: settings.color}}>
                      {settings.type === "crew" && side === "front" && <img src={crewFront}/>}
                      {settings.type === "hoodie" && side === "front" && <img src={hoodieFront}/>}
                      {settings.type === "longsleeve" && side === "front" && <img src={longsleeveFront}/>}
                      {settings.type === "tanktop" && side === "front" && <img src={tankFront}/>}
                      {settings.type === "crew" && side === "back" && <img src={crewBack}/>}
                      {settings.type === "hoodie" && side === "back" && <img src={hoodieBack}/>}
                      {settings.type === "longsleeve" && side === "back" && <img src={longsleeveBack}/>}
                      {settings.type === "tanktop" && side === "back" && <img src={tankBack}/>}
                      <FabricJSCanvas className={"canvas"} onReady={onReady}/>
                  </div>

                  <div className={"panel"}>
                      <Panel>
                          <Form method={"POST"} action={""} onSubmit={e => {
                              e.preventDefault();
                              let frontData = "";
                              let backData = "";
                              if(side === "front") {
                                  frontData = JSON.stringify(editor.canvas);
                                  if(backShirt === "") {
                                      backData = '{"objects": []}';
                                  } else {
                                      backData = backShirt;
                                  }
                              }else {
                                  backData = JSON.stringify(editor.canvas);
                                  frontData = frontShirt;
                              }
                              let frontSVG = "";
                              let backSVG = "";
                              const frontCanvas = new fabric.StaticCanvas(null, {width: 200, height: 400});
                              frontCanvas.loadFromJSON(frontData, () => {
                                  frontCanvas.renderAll.bind(frontCanvas);
                                  const frontCanvasSVG = frontCanvas.toSVG({suppressPreamble: true});
                                  let frontShirtFile = "";

                                  switch(settings.type) {
                                      case "crew":
                                          frontShirtFile = crewFront;
                                          break;
                                      case "longsleeve":
                                          frontShirtFile = longsleeveFront;
                                          break;
                                      case "hoodie":
                                          frontShirtFile = hoodieFront;
                                          break;
                                      case "tanktop":
                                          frontShirtFile = tankFront;
                                          break;
                                      default: break;
                                  }

                                  fetch(frontShirtFile)
                                      .then(response => response.blob())
                                      .then(blob => {
                                          const frontShirtReader = new FileReader();
                                          frontShirtReader.onloadend = () => {
                                              const frontSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="530" height="630" xml:space="preserve">' +
                                                  '<rect width="530" height="630" fill="' + settings.color + '"/>' +
                                                  '<image xlink:href="' + frontShirtReader.result + '"/>' +
                                                  '<g>' +
                                                  frontCanvasSVG.replace('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="400" viewBox="0 0 200 400" xml:space="preserve">', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="160" y="100" width="200" height="400" viewBox="0 0 200 400" xml:space="preserve">') +
                                                  '</g></svg>';
                                              const backCanvas = new fabric.StaticCanvas(null, {width: 200, height: 400});
                                              backCanvas.loadFromJSON(backData, () => {
                                                  backCanvas.renderAll.bind(backCanvas);
                                                  const backCanvasSVG = backCanvas.toSVG({suppressPreamble: true});
                                                  let backShirtFile = "";
                                                  switch(settings.type) {
                                                      case "crew":
                                                          backShirtFile = crewBack;
                                                          break;
                                                      case "longsleeve":
                                                          backShirtFile = longsleeveBack;
                                                          break;
                                                      case "hoodie":
                                                          backShirtFile = hoodieBack;
                                                          break;
                                                      case "tanktop":
                                                          backShirtFile = tankBack;
                                                          break;
                                                      default:
                                                          break;
                                                  }

                                                  fetch(backShirtFile)
                                                      .then(response => response.blob())
                                                      .then(blob => {
                                                          const backShirtReader = new FileReader();
                                                          backShirtReader.onloadend = () => {
                                                              const backSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="530" height="630" xml:space="preserve">' +
                                                                  '<rect width="530" height="630" fill="' + settings.color + '"/>' +
                                                                  '<image xlink:href="' + frontShirtReader.result + '"/>' +
                                                                  '<g>' +
                                                                  backCanvasSVG.replace('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="400" viewBox="0 0 200 400" xml:space="preserve">', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="160" y="100" width="200" height="400" viewBox="0 0 200 400" xml:space="preserve">') +
                                                                  '</g></svg>';
                                                              const data = {
                                                                  article: e.target.elements["article"].value,
                                                                  name: e.target.elements["article"].name,
                                                                  type: settings.type,
                                                                  color: settings.color,
                                                                  frontData: frontData,
                                                                  backData: backData,
                                                                  frontSVG: frontSvg,
                                                                  backSVG: backSvg,
                                                              };
                                                              console.log(JSON.stringify(data));
                                                          };
                                                          backShirtReader.readAsDataURL(blob);
                                                      });
                                              })

                                          }
                                          frontShirtReader.readAsDataURL(blob);
                                      })

                              });
                          }}>
                              <Form.Group className="mb-3" controlId="formArticle">
                                  <Form.Label>Артикул</Form.Label>
                                  <Form.Control name={"article"} type="text" placeholder="Артикул" />
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formName">
                                  <Form.Label>Наименование</Form.Label>
                                  <Form.Control name={"name"} type="text" placeholder="Наименование" />
                              </Form.Group>
                              <Button type={"submit"} style={{width: "100%"}}>Сохранить</Button>
                          </Form>
                      </Panel>
                  </div>
              </div>
          </div>
      </SettingsContext.Provider>
  );
}

export default App;
