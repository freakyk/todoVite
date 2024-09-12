import { useState, useEffect } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";

export default function App() {
    const [datas, setdatas] = useState([]);

    // 데이터 GET
    const getDatas = async function(url){
        try{
            const fetchUrl = await fetch(url)
            const fetchdata = await fetchUrl.json();
            setdatas(fetchdata);
        }catch(error){
            console.log(error);
        }
    }
    // 맨 처음 컴포넌트가 렌더링 될때 한번만 초기데이터 불러오기!
    useEffect(() => {
        getDatas('http://localhost:3000/todos');
    },[])

  return (
    <main>
        <h3>TodoList 만들기</h3>
        <InputTodo setdatas={setdatas} />
        <TodoList datas={datas} setdatas={setdatas} />
    </main>
  );
}
