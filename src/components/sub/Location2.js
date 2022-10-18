import { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout"

export default function Location() {

    const {kakao} = window;
    //윈도우 객체에 등록되어 있는 카카오를 변수명으로 비구조화할당을 한것 
    //윈도우 객체가 카카오 객체를 사용 할 수 있도록 하는 코드
    //const kakao = (window).kakao; 이게 const {kakao} = window로 쓴거

    // var container = document.getElementById('map');
    // 리얼돔에서 참조하는 방법으로 해당방법은 가상돔인 리액트에선 사용할수 없다
    // 리액트에서는 useRef라는 훅을 사용하여 가상으로 생선된 DOM을 참조할수있다


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
    // useRef를 이용해서 가상돔을 참조할 변수로 컨테이너를 생성한뒤 null값으로 빈구역을 만들어둠
    const btns = useRef(null);
    const [Location, setLocation] = useState(null);
    //useEffect에서 만들어진 지도 인스턴스를 담을 state를 생성 
    const [Traffic, setTraffic] = useState(false);
    //토글기능을 구현을 위한 state값을 추가 불린값을 부여한다 스위치가 가능한 불린값을 주는것 

    const [Info] = useState(info);
    // setInfo 는 info가 바뀔 일이 없으므로 필요가 없다 원래 const[info, setInfo]
    const [Index, setIndex] = useState(0);
    // 인덱스가 변화될때 렌더링이 필요하므로 useState에 담아 관리한다 

    const option = { //지도를 생성할 때 필요한 기본 옵션
        center: Info[Index].latlng,  //기존 0에서 Index로 변경 
        // center: {offset: new kakao.maps.Point(116,99)}, //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

    // const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    //마커 위치 인스턴트 생성
    const markerPosition = Info[Index]. latlng;

    // const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
     const imageSrc = Info[Index]. imgUrl;
    // const imageSize = new kakao.maps.Size(232,99);
    const imageSize = Info[Index]. imgSize;
    // const imageOption = {offset: new kakao.maps.Point(116,99)};
     const imageOption = Info[Index]. imgPos;
    //마커이미지 변경에 필요한 정보값 3개를 등록 

    

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,imageOption);
    const marker = new kakao.maps.Marker({
         position: markerPosition,
         image : markerImage
    });
    //위치 인스턴트 값을 인수로 전달해서 다시 마커 인스턴트 생성 


    //useEffect는 처음렌더링(마운트)될때 ! useEffect는 current에값이 담김
    useEffect(()=>{
       //지도 인스턴트 최종 생성하는 코드 
       
       container.current.innerHTML = '';
       //중요중요 !! 뒤에 생기는 렌더링없애기
        const map_instance = new kakao.maps.Map(container.current, option); //지도 생성 및 객체 리턴
        //지도 인스턴트를 활용해서 마커를 생성하는 코드 
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

    
    },[Index]); // 기존 컴포넌트가 처음 마운트 되었을 때만 지도를 출력하던 방식에서 

    useEffect(()=>{
        if(!Location) return; //로케이션의 기본값(state)이 null이라서 로케이션이 없으면 오류방지
        //location state의 값은 두번째 호출부터 값이 담겨 사이클이 돌아가므로 처음값이 존재하지 않는 초기 오류 방지를 위해 조건문처림함
        
        //트래픽값에 따라서 생성과 삭제로 나누어서 코드를 제공, 구현 
        Traffic 
        ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) 
        : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        
     },[Traffic]); // traffic state값이 변경될때마다 실행
     

     //토글로 트래픽의 state를 관리를 통한 변화를 새로운 useEffect를 만들어서 상태관리하게한다.
     //트래픽 토글전용 useEffect => 
    


return (
        <Layout name={"Location"}>
            <div id="map" ref={container}></div>
            {/* 기존의 두개의 버튼에서 한개의 토글버튼으로 바꿈
            버튼클릭시 트래픽값을 반전처리 => !Traffic */}

            <div className="btnSet">

            <button onClick={() => {setTraffic(!Traffic) }}>
                
                {/* Traffic값에 따라서 버튼의 내용도 변경  */}
                {Traffic ? 'Traffic OFF' : 'Traffic ON'}

            </button>
            <ul className="branch" ref={btns}>
                {/* 각버튼을 클릭할때마다 index값을 변경  */}
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
            {/* <button onClick={() => {Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}}>
                Traffic Off
            </button> */}

        </Layout>
    );
}
