import { faEmber } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../common/Layout';

function Member() {

    const history = useHistory();
    /* useHistory는 URL주소를 변경할 때 사용하는 hook이다 
        리액트특성상 url변경없이 내부 컴포넌트만 변경시켜 화면을 바꿔줄수있다. 하지만 url을 바꿔주면 현재
        어느페이지에 있는지 사용자가 대략적으로 알수있다. url주소 변경없이 컴포넌트의 변경만으로 사용자가 웹페이지를 이용할 수 있지만 복잡한 순서와 사용자 경험을 개선하기 위해 핵심 컴퓨넌트들이 변경할때  url을 같이 변경시켜주면 
        "사용자 친화적인 페이지가" 될 수 있다
         useHistory는 사용하기위해 리액트라우터돔을 사용해야한다
        라우터의 버전이 5인경우에 usehistory이고
        라우터의 버전이 6인경우에는 이름이바뀌었다  */
        
       
    //user id 의 입력값이 담길 초기 state르 객체로 지정
    const initVal = {
        userid: '',
        email: '',
        pwd1: '',
        pwd2: '',
        gender: null,
        interests: null,
        comments: '',
        edu:'',
    };


    //해당객체를 state에 초기값으로 저장

    // 변수 var 값에다가 userid: '', 추가
    const [Val, setVal] = useState(initVal);


    const [Err, setErr] = useState({});


    const [Submit, setSubmit] = useState(false);

    const check = (value) => {
        const errs = {};

        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*(_+)]/;
        // 에러메세지 기본값 비워둠
        if (value.userid.length < 5) {
            errs.userid = '아이디를 5글자 이상 입력하세요';
            // console.log("5글자 이상해야합니다.");
        }
        //이메일 인증은 8글자 이상, @이있어야 한다 . 
        if (value.email.length < 8 || !/@/.test(Val.email)) {
            errs.email = "이메일은 8글자 이상 @를 포함하세요";
        }
        if(
            value.pw1 < 5 || 
            !eng.test(value.pwd1) || 
            !num.test(value.pwd1) || 
            !spc.test(value.pwd1)

            //5글자보다 작으면 참이므로 이후의 것은 판단하지 않고 밑으로 내려가서 에러메세지 출력, 거짓이면 ||넘어가서 영어글자수를 물어보는것 영어글자가 없으면 참이므로 밑에 에러메세지 있으면 거짓이므로 || 넘어감 모두 거짓이여야 에러메세지없이 통과 
        ){
            errs.pwd1 = '비밀번호는 5글자이상, 영문, 숫자, 특수문자를 모두 포함하세요';

        }
        if(value.pw1 !== value.pwd2 || value.pw2< 5){
            errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요'
        }
        if(!Val.gender){
            errs.gender = '성별을 선택하세요';
        }
        if(!Val.interests){
            errs.interests ='하나이상 체크하세요';
        }
        if(Val.comments.length < 20){
            errs.comments = '남기는 말을 20글자 이상 입력하세요';
        }

        if(Val.edu === ''){
            errs.edu = "최종학력을 선택하세요!";
        }

        return errs;
       
    };
    const handleChange = (e) => {

        //순서2 입력하고 있는 인풋요소의 네임 밸류값을 변수로 비구조화 할당
        const { name, value } = e.target;
        //순서 3 비구조화 할당으로 받은 값을 Val state에 저장하고
        //순서 4 setVal함수가 렌더링해서 우리가 볼수 있도록 함 
        setVal({ ...Val, [name]: value });

    }

    const handleRadio=(e)=>{
            const {name} = e.target;
            const isChecked = e.target.checked;
            setVal({...Val, [name]: isChecked});
    }

    const handleSelect =(e)=>{
        const {name} = e.target;
        const isSelected = e.target.value;
        setVal({...Val, [name]: isSelected});

    }

    const handlecheck =(e)=>{
        let isChecked = false;
        const {name} = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input');
        inputs.forEach((el)=>{
            if(el.checked) isChecked = true;
        });
        setVal({...Val, [name]: isChecked});
    };
    
    const handleReset =()=>{
        setSubmit(false);
        setErr({});
        setVal(initVal);
    }
    // subimit 클릭하면 실행되는 함수
    const handleSubmit = (e) => {
        //실행되는 내용
        // 순서 6 일단 서버전송,이동을 막아줘야한다 a태그가 아니라도 submit자체가 가지는속성을 막는다 
        e.preventDefault();
        //순서 7  Val state값을 인수로 전달해서 check함수에서 인증검사 시작 <{check(Val)}
        setErr(check(Val));
        //순서 8 인증검사 결과 errs가 존재한다면 변환된 에러 객체 Err state에 옮겨담음
    };


    useEffect(()=>{
        const len = Object.keys(Err).length
        if(len === 0 && Submit){
            alert('회원가입이 완료되었습니다. 메인페이지로 이동합니다');
            history.push('/youtube');
        }
    },[Err]);



    return (
        <Layout name={'Member'}>
            {/* 순서 5 전송버튼 클릭시 핸들서브밋함수를 호출 */}
            <form onSubmit={handleSubmit} >
                <fieldset>
                    <legend className='h'>회원가입 폼 양식</legend>
                    <table border='1'>
                        <caption className='h'>회원가입 정보입력</caption>
                        <tbody>

                            {/* userid */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="userid">USER ID</label>
                                </th>
                                <td>
                                    <input type="text"
                                        placeholder='아이디를 입력하세요.'
                                        name='userid'
                                        id='userid'
                                        // Val State에 있는 userid값을 input요소에 출력
                                        value={Val.userid}

                                        //순서 1 인풋에 값으 입력시 핸들체인지 함수가 발생
                                        onChange={handleChange}
                                    // console.log(e.target.value);
                                    //온체인지 이벤트가 발생할때마다 기존 Val state값을 복사해서 현재입력하고있는 값을 추가한뒤 바꿔치기한다
                                    //  {(e) => {setVal({...Val, userid:e.target.value});

                                    />
                                    {/* {순서 9 혹시 에러가 있으면 err 정보값을 화면에 출력} */}
                                    <span className='err'>{Err.userid}</span>
                                </td>
                            </tr>
                               {/* password */}
                            <tr>
                                <th scope="row">
                                    <label htmlFor="pwd1">PASSWORD</label>
                                </th>
                                <td>
                                    <input type="password" name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요' onChange={handleChange} />
                                    <span className="err">{Err.pwd1}</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="pwd2">PASSWORD</label>
                                </th>
                                <td>
                                    <input type="password" name='pwd2' id='pwd2' placeholder='비밀번호를 재입력하세요' onChange={handleChange} />
                                    <span className="err">{Err.pwd2}</span>
                                </td>
                            </tr>

                            {/* email */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="email">E-Mail</label>
                                </th>
                                <td>
                                    <input type="text"
                                        id='email'
                                        name='email'
                                        placeholder='이메일 주소를 입력하세요'
                                        value={Val.email}
                                        onChange={handleChange}
                                    />
                                    <span className='err'>{Err.email}</span>
                                </td>
                            </tr>
                            {/* edu */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor='edu'>EDUCATION</label>
                                </th>
                                <td>
                                    <select name='edu' id='edu' onChange={handleSelect}>
                                        <option value="">학력을 선택하세요</option>
                                        <option value="elementary">초등학교 졸업</option>
                                        <option value="middle">중학교 졸업</option>
                                        <option value="high">고등학교 졸업</option>
                                        <option value="college">대학교 졸업</option>
                                    </select>
                                    <span className='err'>{Err.edu}</span>
                                </td>
                            </tr>
                            {/* gender */}
                            <tr>
                                <th scope='row'>GENDER</th>
                                <td>
                                    <label htmlFor="male">MALE</label>
                                    <input type='radio' name="gender" id="male" onChange={handleRadio} />
                                    <span className="err">{Err.gender}</span>


                                    <label htmlFor="male">FEMALE</label>
                                    <input type='radio' name="gender" id="female" onChange={handleRadio} />
                                    <span className="err">{Err.gender}</span>
                                    
                                </td>
                            </tr>
                            {/* check box */}
                            <tr>
                                <th scope='row'>INTERESTS</th>
                                <td>
                                    <label htmlFor='sports'>SPORTS</label>
                                    <input type="checkbox" name='interests' id='sports' onChange={handlecheck} />
                                    <span className='err'>{Err.interests}</span>

                                    <label htmlFor='music'>MUSIC</label>
                                    <input type="checkbox" name='interests' id='sports' onChange={handlecheck} />
                                    <span className='err'>{Err.interests}</span>   
                                    <label htmlFor='game'>GAME</label>
                                    <input type="checkbox" name='interests' id='sports' onChange={handlecheck} />
                                    <span className='err'>{Err.interests}</span>
                                </td>
                            </tr>
                            {/* coments */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="comments">COMENTS</label>
                                </th>
                                <td>
                                    <textarea name="commnents" id="comments" cols="30" rows="5"value={Val.comments} onChange={handleChange}></textarea>
                                    <span className='err'>{Err.comments}</span>
                                </td>
                            </tr>

                            {/* btn set */}
                            <tr>
                                <th colSpan="2">
                                    <input type="reset" value="CANCEL" onClick={handleReset} />
                                    <input type="submit" value="SEND" onClick={()=>setSubmit(true)} />
                                    
                                </th>
                            </tr>
                        </tbody>


                    </table>
                </fieldset>
            </form>
        </Layout>

    );
}
export default Member;