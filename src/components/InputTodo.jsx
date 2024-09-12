import { useRef } from "react";

function InputTodo({setdatas}){
    // 데이터 POST
    const inputDatas = async function(url,todo){
        try{
            const id = String(Date.now());
            const fetchUrl = await fetch(url,{
                method : "POST",
                body : JSON.stringify({
                    id : id,
                    todo : todo,
                    done : false
                })
            })
            await fetchUrl.json();
            setdatas((prev) => [
                ...prev, {id, todo, done : false}
            ]);
        }catch(error){
            console.log(error);
        }
    }

    // 할일추가 클릭이벤트
    const todoInput = useRef(null);
    function handleClick(){
        if(todoInput.current.value !== ""){
            inputDatas('http://localhost:3000/todos',todoInput.current.value);
        }
        todoInput.current.value = "";
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <input type="text" placeholder="할일을 입력해주세요" ref={todoInput} />
            &nbsp;
            <button onClick={handleClick}>추가하기</button>
        </form>
    )
}
export default InputTodo;