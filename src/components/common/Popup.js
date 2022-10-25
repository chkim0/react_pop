import { forwardRef, useEffect, useImperativeHandle, useState} from "react";

//팝업 컴포넌트 생성 props으로 setOpen 변수 가져옴
const Popup = forwardRef((props, ref)=> {


    const [Open, setOpen] = useState(false);
    useImperativeHandle(ref,()=>{
        return{
            open: () => setOpen(true),

        };

    
    });

     useEffect(() => {
        Open ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");
    }, [Open]);
    //윹튜브 버전
    // useEffect(() => {
    //     // 팝업이뜨면
    //     document.body.style.overflow = "hidden";
    //     // 사라지면
    //     return () => {
    //         document.body.style.overflow = "auto";
    //     }
    // }, []);


    return (

        <>
        {Open &&(
        // aside pop 호출
        <aside className="pop">
            {/* iframe 값 가져옴 */}
            <div className="con">{props.children}</div>
            {/* 닫기 누르면 open값을 falsefh */}
            <span className="close" onClick={() => setOpen(false)}>close</span>
        </aside>
        )}
        </>
    );
});
export default Popup;