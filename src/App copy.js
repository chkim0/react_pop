import { Route, Switch } from 'react-router-dom';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
import { useState, useEffect, useRef } from 'react';
import Timer from './components/common/Timer';

//useRef #2
function App() {

	/*
		Dom요소에 접근 ex input:focus
	*/

	const inputRef = useRef();

	useEffect(() => {

		inputRef.current.focus();

	}, [])

	const login = () => {
		alert(`환영합니다 ${inputRef.current.value}!`);
		inputRef.current.focus();
	}

	return (
		<>
			<div>
				<input ref={inputRef} type="text" placeholder='유저네임' />
				<button onClick={login}>로그인</button>
			</div>
		</>
	);
}

//useRef #1
// function App() {

// 	/*
// 		state의 변화 -> 렌더링 -> 컴포넌트 내부 변수들 초기화
// 		ref의 변화 - > No 랜더링 - > 변수들의 값이 유지됨
// 		state의 변화 -> 렌더링 -> 그대로 Ref의 값은 유지됨

// 		Dom요소에 접근 ex input:focus
// 	*/

// 	const [renderer, setRenderer] = useState(0);
// 	const countRef = useRef(0);
// 	let countVar = 0;

// 	const doren = () => {
// 		setRenderer(renderer + 1);
// 	}

// 	const incRef = () => {
// 		countRef.current = countRef.current + 1;
// 		console.log(countRef.current);
// 	}

// 	const incVar = () => {
// 		countVar = countVar + 1;
// 		console.log(countVar);
// 	}


// 	return (
// 		<>
// 			<div>
// 				<p>ref :{countRef.current}</p>
// 				<p>var : {countVar}</p>
// 				<button onClick={doren}>랜더!</button>
// 				<button onClick={incRef}>ref 올려</button>
// 				<button onClick={incVar}>var 올려</button>
// 			</div>
// 		</>
// 	);
// }

//useEffect
// function App() {
// 	const [showTimer, setshowTimer] = useState(false);

// 	return (
// 		<>
// 			<div>
// 				<button onClick={() => { setshowTimer(!showTimer) }}>Toggle</button>
// 			</div>
// 		</>
// 	);
// }

// useState
// function App() {

// 	const [names, setName] = useState(['홍길동', '길민수']);
// 	const [input, setInput] = useState('');

// 	const handleInputChange = (e) => {
// 		setInput(e.target.value);
// 	}

// 	const addName = () => {
// 		setName((prevState) => {
// 			console.log(prevState);
// 			return [input, ...prevState];
// 		});
// 	}



// 	return (
// 		<>
// 			<div>
// 				<input type="text" value={input} onChange={handleInputChange} />
// 				<button onClick={addName}>Upload</button>
// 				{
// 					names.map((name, index) => {
// 						return <p key={index}>{name}</p>
// 					})
// 				}
// 			</div>
// 		</>
// 	);
// }

export default App;


/*



*/