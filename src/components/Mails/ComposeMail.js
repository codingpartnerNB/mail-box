import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { useRef, useState } from "react";
import styles from './ComposeMail.module.css';
import { useDispatch } from "react-redux";
import { addMailHandler } from "../../store/mailAllActions";

const ComposeMail = ()=>{
    const emailInputRef = useRef();
    const subjectInputRef = useRef();
    const dispatch = useDispatch();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (newEditorState)=>{
        setEditorState(newEditorState);
    }

    const submitMailHandler = (event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredSubject = subjectInputRef.current.value;
        const mail = {
            subject: enteredSubject,
            body: editorState
        }
        dispatch(addMailHandler(mail,enteredEmail.replace(/[@.]/g, "")));
    }

    return(
        <section className="border-2 border-amber-900 bg-amber-50 rounded-lg my-5 w-3/4 m-auto shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] shadow-amber-900">
            <form onSubmit={submitMailHandler} className="mx-6 my-4">
                <div className="flex gap-4">
                    <label htmlFor="to" className="my-2">To:</label>
                    <input type="email" id="to" ref={emailInputRef} className="w-full border-2 border-gray-400 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800" required />
                </div>
                <hr />
                <input type="text" ref={subjectInputRef} placeholder="Subject" className="w-full border-2 border-gray-400 rounded-lg pl-2 p-1 my-2 focus:outline-none focus:border-2 focus:border-amber-800" required />
                <hr />
                <div className="flex flex-col h-full">
                    <Editor
                        editorState={editorState}
                        toolbarClassName={styles['my-toolbar']}
                        wrapperClassName={styles['my-wrapper']}
                        editorClassName={styles['my-editor']}
                        onEditorStateChange={onEditorStateChange}
                    />
                </div>
                <button type="submit" className="bg-amber-700 text-white w-full p-1.5 my-3 rounded-lg text-bold hover:bg-amber-900">Send</button>
            </form>
        </section>
    );
}

export default ComposeMail;