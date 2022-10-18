import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "../common/Popup";

export default function Youtube() {

    const [Vids, setVids] = useState([]);
    const [Open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const key = 'AIzaSyBFLAU4DL_bNMTCPBWvqtiTwRwd24rWKgU' ;
        const playList = 'PLBVGGbELl6ghM0xiHh-ZGunQXU7jThujc' ;
        const num = 8;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;
        
        axios.get(url).then((json) => {
            console.log(json.data);
            setVids(json.data.items);
        })
    }, []);


    return (
        <>
            <Layout name={"Youtube"}>
                {Vids.map((data, index) => {

                    let tit = data.snippet.title;
                    let desc = data.snippet.description;
                    let date = data.snippet.publishedAt;

                    return (
                        <article key={index}>
                            <h3>
                                {tit.length > 30 ? tit.substr(0, 30) + '...' : tit}
                            </h3>
                            <div className="txt">
                                <p>{desc.length > 100 ? desc.substr(0, 100) : desc}</p>
                                <span>{date.split('T')[0]}</span>
                            </div>

                            {/* pic 클릭하게 되면 */}
                            <div className="pic" onClick={() => {
                                // Open = true값으로 변경
                                setOpen(true);
                                // index를 받아옴
                                setIndex(index);
                            }}>
                                <img src={data.snippet.thumbnails.standard.url} alt={"data.snippet.title"} />
                            </div>
                        </article>
                    );
                })};


            </Layout>
            {/* Open이 true이고 setOpen 값이 ture이면 팝업호춯  */}
            {Open && <Popup setOpen={setOpen} >
                {/* 아이프레임 호출 */}
                <iframe src={`https://www.youtube.com/embed/${Vids[index].snippet.resourceId.videoId}`} frameBorder="0">
                </iframe>
            </Popup>}
        </>
    );
}