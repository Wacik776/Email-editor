import { Bold, Eraser, Italic, Underline } from "lucide-react";
import styles from "./EmailEditor.module.scss";
import { useRef, useState } from "react";
import { applyStyle, Tstyle } from "./apply-style";
import parse from 'html-react-parser'

export function EmailEditor() {
  const [text,setText] = useState(`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus autem quod excepturi recusandae velit dolorem,
            minus, consectetur voluptatibus incidunt adipisci laboriosam
            et, rerum fuga dolor culpa maiores at. Eveniet, dolorem!`)

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  
  const updateSelection = () =>{
    if(!textRef.current) return;
    setSelectionStart(textRef.current?.selectionStart);
    setSelectionEnd(textRef.current?.selectionEnd);
  }

  const applyFormat = (type: Tstyle) =>{
    if (!textRef.current) return
    const textBefore = text.substring(0,selectionStart);
    const textAfter = text.substring(selectionEnd);
    const selectedText = text.substring(selectionStart,selectionEnd);
    if (!selectedText) return
    setText(textBefore + applyStyle(type, selectedText) + textAfter);
  }
  return (
    <div>
      <h1>Email editor</h1>
      <div className={styles.preview}>{parse(text)}</div>
      <div className={styles.card}>
        
          <textarea className={styles.editor}
          onSelect={updateSelection}
          ref={textRef}
          value={text}
          onChange={e=>setText(e.target.value)}
>            
          </textarea>
          <div className={styles.actions}>
            <div className={styles.tools}>
            <button onClick={()=>setText('')}><Eraser size={17}/></button>
            <button onClick={()=>applyFormat('bold')}><Bold size={17}/></button>
            <button onClick={()=>applyFormat('italic')}><Italic size={17}/></button>
            <button onClick={()=>applyFormat('underline')}><Underline size={17}/></button>

            </div>
            <button>Send message</button>
          </div>
      </div>
    </div>
  )
}