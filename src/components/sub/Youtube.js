import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "../common/Popup";

export default function Youtube() {

    // 상태관리 변수

    // 처음 Vids 배열생성
    const [Vids, setVids] = useState([]);
    // Open 변수에 false 초기값 false 저장
    const [Open, setOpen] = useState(false);
    // Index 변수에 초기값 0저장
    const [Index, setIndex] = useState(0);

    // 처음화면 시작
    useEffect(() => {
        // 유튜브 관련정보 가져오기
        const key = 'AIzaSyAKqZ1Dx9awi1lCS84qziASeQYZJqLxLSM';
        const playlist = "PLBVGGbELl6ghM0xiHh-ZGunQXU7jThujc";
        const num = 6;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

        // axios를 통해 url 데이터를 가져와서 json 형태로 뿌림 
        axios.get(url).then((json) => {
            console.log(json.data);
            // Vids 변수에 json.data 값을 넣어줌
            setVids(json.data.items);
        })
    }, []);

    return (
        <>
            <Layout name={"Youtube"}>
                {/* Vids 배열의 반복 */}
                {Vids.map((data, index) => {

                    // 제목 변수 선언
                    const tit = data.snippet.title;
                    // 내용 변수 선언
                    const desc = data.snippet.description;
                    // 날짜 변수 선언
                    const date = data.snippet.publishedAt;

                    return (
                        // article 내용 뿌려줌
                        <article article key={index} >
                            {/* 제목 30글자 이상이면 글자 자름 */}
                            <h3>{tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h3>
                            {/* 내용 */}
                            <div className="txt">
                                <p>{desc.length > 100 ? desc.substr(0, 100) : desc}</p>
                                <span>{date.split('T')[0]}</span>
                            </div>
                            {/* 그림을 클릭하면 함수실행 */}
                            <div className="pic" onClick={() => {
                                // 변수 Open값을 true로 바꿈
                                setOpen(true);
                                // 변수 Index값을 index로 바꿈
                                setIndex(index);
                            }}>
                                <img
                                    src={data.snippet.thumbnails.standard.url}
                                    alt={data.snippet.title} />
                            </div>
                        </article>
                    );
                })}

            </Layout>
            {
                // {/* Open 값이 true라면 Popup 컴포넌트 실행 false면 안보임*/ }
                Open && <Popup setOpen={setOpen}>
                    <iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameBorder='0'></iframe>
                </Popup>
            }
        </>

    );
}