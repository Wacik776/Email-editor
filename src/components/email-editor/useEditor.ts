import { useCallback, useRef, useState } from "react";
import { applyStyle, Tstyle } from "./apply-style";

export function useEditor(){
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

const applyFormat = useCallback((type: Tstyle) =>{
if (!textRef.current) return
const textBefore = text.substring(0,selectionStart);
const textAfter = text.substring(selectionEnd);
const selectedText = text.substring(selectionStart,selectionEnd);
if (!selectedText) return
setText(textBefore + applyStyle(type, selectedText) + textAfter);
}, [text, selectionStart, selectionEnd]);

    return {text, applyFormat, updateSelection, setText, textRef}
}