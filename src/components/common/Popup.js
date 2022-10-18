import { useEffect } from "react";

function Popup(props){

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return()=>{
            document.body.style.overflow = "auto";
        }    // return()=>클린업함수 원래상태로돌려줘!!
    },[]);
    return(
        <aside className="pop">
            <div className="con">{props.children}</div>
            <span className="close" onClick={()=>{props.setOpen(false)}}>close</span>
        </aside>
    );


}

export default Popup;