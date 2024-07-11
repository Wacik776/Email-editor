import { Bold, Eraser, Italic, Underline } from "lucide-react";
import styles from "./EmailEditor.module.scss";
import parse from 'html-react-parser'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email.service";
import { useEditor } from "./useEditor";
import { useEffect } from "react";

export function EmailEditor() {
  const {applyFormat, text, updateSelection, setText, textRef} = useEditor()

  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationKey: ['create email'],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess(){
      setText('')
      queryClient.refetchQueries({queryKey: ["email list"]})
    } 
  })

  useEffect(()=>{
    const handleKeyPress = (event: KeyboardEvent) =>{
      const {ctrlKey, key} = event;
      if (ctrlKey){
        switch (key.toLowerCase()){
          case 'b':
            applyFormat('bold')
            break
          case 'i':
            applyFormat('italic')
            break
          case 'y':
            applyFormat('underline')
            break
        }
      }}
    window.addEventListener('keydown',handleKeyPress)

    return ()=>{
      window.removeEventListener('keydown',handleKeyPress)
    };
  },[applyFormat])

  return (
    <div>
      <h1>Email editor</h1>
      {text && 
      <div className={styles.preview}>{parse(text)}</div>}
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
            <button disabled={isPending} onClick={()=>mutate()} >Send message</button>
          </div>
      </div>
    </div>
  )
}