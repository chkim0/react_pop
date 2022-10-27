import Layout from "../common/Layout";
import Popup from "../common/Popup";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Masonry from 'react-masonry-component';


export default function Gallery() {

    const masonryOptions = { transitionDuration: '0.5s' };
    const [Items, setItems] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [EnableClick, setEnableClick] = useState(true);
    const [Index, setIndex] = useState(0);
    const frame = useRef(null);
    const input = useRef(null);
    const pop = useRef(null);
    /*
    interest 방식 호출
    getFlickr({
        type: 'interest',
    })
    search 방식 버튼
    getFlickr({
        type:'search',
        tags: '검색키워드',
    })
    */
    const getFlickr = async (opt) => {
        const key = '4612601b324a2fe5a1f5f7402bf8d87a';
        const method_interest = "flickr.interestingness.getList";
        const method_search = "flickr.photos.search";
        const method_user = "flickr.people.getPhotos";
        const num = 20;
        let url = '';

        if (opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
        }
        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
        }
        if (opt.type === 'user') {
            url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
        }


        // await axios.get(url).then((json) => {
        //     setItems(json.data.photos.photo);
        // })
        const result = await axios.get(url);
        if (result.data.photos.photo.length === 0) return alert('해당 검색어의 결과 이미지가 없습니다');
        //   console.log(result.data.photos.photo);
        setItems(result.data.photos.photo);

        //셋타임아웃으로 비동기화 시키고 1초 딜레이를 준뒤 로딩바를 안보이게 false로 바꾼뒤에 on을 프레임에 붙여서 보이게한다
        setTimeout(() => {
            setLoading(false);
            frame.current.classList.add('on');

            setTimeout(() => {
                setEnableClick(true);
            }, 500);//프레임에 on붙이고 위로 올라오는 모션기간동안 0.5초 홀딩

        }, 1000); //이미지 호출이 완료되고 masonry모션 적용시간까지 홀딩하는 1초



    };

    useEffect(() => getFlickr({ type: 'user', user: '196642495@N03' }), []);
    //함수의 정의 형태로 콜백함수가 들어와야 한다, 함수를 단순 호출하는 형태는 읽어들일 수 없다
    const showSearch = () => {
        const result = input.current.value.trim();
        input.current.value = '';

        if (!result) return alert('검색어를 입력하세요');

        if (!EnableClick) return;
        setEnableClick(false);
        setLoading(true);
        frame.current.classList.remove('on');
        getFlickr({ type: 'search', tags: result, });
    };


    return (
        <>
            <Layout name={'Gallery'}>
                {Loading && (
                    <img
                        className="loading"
                        src={`${process.env.PUBLIC_URL}/img/loading.gif`}
                    />
                )}

                <div className="controls">
                    <nav>
                        <button
                            onClick={() => {
                                if (!EnableClick) return;
                                //모션중이면 false일테니 return으로 방지
                                setEnableClick(false);
                                //true로 들어와서 다시 false로 바꾸어 재이벤트 방지
                                setLoading(true);
                                frame.current.classList.remove('on');
                                getFlickr({ type: 'interest' });
                            }}
                        >
                            Interest Gallery
                        </button>
                        <button
                            onClick={() => {
                                if (!EnableClick) return;
                                setEnableClick(false);
                                setLoading(true);
                                frame.current.classList.remove('on');
                                getFlickr({ type: 'user', user: '196642495@N03' });
                            }}
                        >
                            My Gallery
                        </button>
                    </nav>
                    <div className="searchBox">
                        <input type="text" ref={input} placeholder='검색어를 입력하세요'
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') showSearch();
                            }} />
                        <button
                            onClick={showSearch}
                        >Search</button>
                    </div>
                </div>

                <div className="frame" ref={frame}>
                    <Masonry elementType={'div'} options={masonryOptions}>


                        {Items.map((item, idx) => {
                            return (
                                <article key={idx}>
                                    <div className="inner">
                                        <div className="pic"
                                            onClick={() => {
                                                pop.current.open();
                                                setIndex(idx);
                                            }}


                                        >

                                            <img
                                                src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                                                alt={item.title} />
                                        </div>
                                        <h2>{item.title}</h2>

                                        <div className="profile">
                                            <img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner}
                                                onError={(e) => {
                                                    e.target.setAttribute(
                                                        'src',
                                                        'https://www.flickr.com/images/buddyicon.gif'
                                                    );
                                                }}
                                            />
                                            <span
                                                onClick={(e) => {
                                                    if (!EnableClick) return;
                                                    setEnableClick(false);
                                                    setLoading(true);
                                                    frame.current.classList.remove('on');
                                                    getFlickr({ type: 'user', user: e.target.innerText });
                                                }}
                                            >{item.owner}</span>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </Masonry>
                </div>
            </Layout>

            <Popup ref={pop}>
                {Items.length !== 0 && (

                    <img
                        src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
                        alt={Items[Index].title} />
                )

                }

            </Popup>
        </>
    );
}