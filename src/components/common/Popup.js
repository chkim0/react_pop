import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence, } from 'framer-motion';

//팝업 컴포넌트 생성 props으로 setOpen 변수 가져옴
const Popup = forwardRef((props, ref) => {


    const [Open, setOpen] = useState(false);
    useImperativeHandle(ref, () => {
        return {
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

        <AnimatePresence>
            {Open && (
                // aside pop 호출
                <motion.aside className="pop"
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360, transition: { duration: 2 } }}
                    exit={{ opacity: 0, scale: 0, rotate: 0, transition: { duration: 1 } }} >
                    {/* iframe 값 가져옴 */}
                    <motion.div className="con"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }}
                        exit={{ opacity: 0, delay: 0.5 }}>{props.children}</motion.div>
                    {/* 닫기 누르면 open값을 false로 */}
                    <motion.span
                        initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 1 } }} className="close" onClick={() => setOpen(false)}>close</motion.span>
                </motion.aside>
            )}
        </AnimatePresence>
    );
});
export default Popup;