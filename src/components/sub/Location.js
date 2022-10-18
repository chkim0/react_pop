
import {useEffect, useRef, useState} from "react";
import Layout from "../common/Layout";

export default function Location(){

    const {kakao} = window;

    const info = [
        {
            title: '오류동 신동아',
            latlng : new kakao.maps.LatLng(37.579584, 126.7325462),
            imgUrl : `${process.env.PUBLIC_URL}/img/marker1.png`,
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset: new kakao.maps.Point(116,99)}
            
          },
           
          {
            title: '올림픽공원',
            latlng : new kakao.maps.LatLng(37.5206868, 127.1214941),
            imgUrl : `${process.env.PUBLIC_URL}/img/marker2.png`,
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset: new kakao.maps.Point(116,99)}
           
          },
          {
            title: '해운대',
            latlng : new kakao.maps.LatLng(35.1631139, 129.1635509),
            imgUrl : `${process.env.PUBLIC_URL}/img/marker3.png`,
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset: new kakao.maps.Point(116,99)}
           
          },
    ];
    const container = useRef(null);
    const btns = useRef(null);
    const [Location, setLocation] = useState(null);
    const [Info] = useState(info);
    const [Index, setIndex] = useState(0);
    const [Traffic, setTraffic] = useState(false);
    const option = {
        center : new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3

    };

    const markerPosition = Info[Index]. latlng;

    // const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
     const imageSrc = Info[Index]. imgUrl;
    // const imageSize = new kakao.maps.Size(232,99);
    const imageSize = Info[Index]. imgSize;
    // const imageOption = {offset: new kakao.maps.Point(116,99)};
     const imageOption = Info[Index]. imgPos;

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,imageOption);
    const marker = new kakao.maps.Marker({
         position: markerPosition,
         image : markerImage
    });

    useEffect(()=>{
        container.current.innerHTML = '';
        //중요중요 !! 뒤에 생기는 렌더링없애기
         const map_instance = new kakao.maps.Map(container.current, option); //지도 생성 및 객체 리턴
         
         marker.setMap(map_instance);
         setLocation(map_instance);
 
         const mapTypeControl = new kakao.maps.MapTypeControl();
         map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
 
 
         const zoomControl = new kakao.maps.ZoomControl();
         map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
 
         for(const btn of btns.current.children) btn.classList.remove("on");
         btns.current.children[Index].classList.add("on");
 
         window.addEventListener("resize",()=>{
             map_instance.setCenter(Info[Index].latlng);
         });
 
     
     },[Index]);

     useEffect(()=>{
        if(!Location) return; //로케이션의 기본값(state)이 null이라서 로케이션이 없으면 오류방지
        //location state의 값은 두번째 호출부터 값이 담겨 사이클이 돌아가므로 처음값이 존재하지 않는 초기 오류 방지를 위해 조건문처림함
        
        //트래픽값에 따라서 생성과 삭제로 나누어서 코드를 제공, 구현 
        Traffic 
        ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) 
        : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        
     },[Traffic]);
    
    
    
    return(
        <Layout name={"Location"}>
            <div id="map" ref={container}></div>
            
            <div className="btnSet">

            <button onClick={() => {setTraffic(!Traffic) }}>
                
                
                {Traffic ? 'Traffic OFF' : 'Traffic ON'}

            </button>
            <ul className="branch" ref={btns}>
               
                {
                Info.map((el,idx) => {

                    return(
                        <li key={idx} onClick = {()=>setIndex(idx)}>{el.title}
                        </li>
                    );
                })
            }
            </ul>
            </div>
        </Layout>
    )

}