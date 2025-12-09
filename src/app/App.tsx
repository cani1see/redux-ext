import {useState} from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import StoreProvider from "@/app/components/context/StoreProvider.tsx";
import {useDispatch, useSelector} from "react-redux";
import {BackgroundDispatch, BackgroundState} from "@/background/store";
import {increment} from "@/background/store/slices/counterSlice.ts";

function Inner() {
  // const [count, setCount] = useState(0);
  const count = useSelector((state: BackgroundState) => state.counter.value);
  const dispatch = useDispatch<BackgroundDispatch>();

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

function App() {
  return (<StoreProvider>
    <Inner/>
  </StoreProvider>);
}

export default App;
