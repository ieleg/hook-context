import React ,{useState,useEffect,Context,useRef,useContext,useMemo,useCallback} from  'react'

let Mycontext = React.createContext(null)
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
function Counter({initialCount}) {
  const [count, setCount] = useState(0);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
function Demo() {
  const [cnt,setCnt] = useState(0);
  const [time,setTime] = useState(2);
  useEffect(() => {
    console.log('USEEFFECT');
    
  })
  useMemo( () => {
    console.log('USEMEMO');
    
  },[time])
  let callback = useCallback(() => {
    return cnt;
  },[])
  // useEffect(() => {
  //   document.title = `You clicked ${cnt} times`;
  // });
  function sleep(times){
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        // alert('?')
        resolve()
      }, times*1000);
    })
  }
   async function click(time) {
    // await sleep(time);
    setCnt(cnt+1);
  }
  return (
    <Mycontext.Provider value={{
      cnt,time
    }}>
      <div>
        callback:{callback()}
        cnt:{cnt}
      </div>
      <button onClick={() => click(time)}>if u click this button,u should wait {time}s before u click again</button>
      <Demo2 cnt={cnt}></Demo2>
      <Counter></Counter>
      <TextInputWithFocusButton></TextInputWithFocusButton>
      <Demo3></Demo3>
    </Mycontext.Provider>
  )
}
const Demo2 = (props) => {  
  return(
    <Mycontext.Consumer>
        {({time,cnt}) => (
          <div>
            the times u clecked:{props.cnt}
            obj.time={cnt}
            <Demo4 cnt={cnt}></Demo4>
          </div>
        )}
        
    </Mycontext.Consumer>

  )
}
const Demo4 = (props) => {

  return (
    <div>
      this is a test{props.cnt} 
    </div>
  )
}
const Demo3 = () => {
  const obj = useContext(Mycontext);
  return(
    <div>
      我是demo3：{obj.time}
    </div>
  )
}
export default Demo