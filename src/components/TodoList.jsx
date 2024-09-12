import { useRef } from "react";

function TodoList({datas, setdatas}) {
    const checkTodo = useRef(null);
    const textTodo = useRef([]);

    // 데이터 DELETE
    const deleteDatas = async function(url,id){
        try{
            const fetchUrl = await fetch(`${url}/${id}`,{
                method : "DELETE"
            })
            await fetchUrl.json();
            // filter로 삭제된것을 제외한 배열을 반환해주기!
            setdatas(prev => prev.filter(item => item.id !== id));
        }catch(error){
            console.log(error);
        }
    }

    // 데이터 PATCH
    const patchDatas = async function(url,id,todo,done){
        try{
            const fetchUrl = await fetch(`${url}/${id}`,{
                method : "PATCH",
                body : JSON.stringify({
                    id : id,
                    todo : todo,
                    done : done
                })
            })
            await fetchUrl.json();
            // 새로운 배열에 추가하는것이 아닌 원본데이터를 변경해주기
            setdatas((prev) =>
                prev.map((item) => { 
                    return item.id === id ? {id, todo, done} : item
                })
            );
        }catch(error){
            console.log(error);
        }
    }

    // checkbox 이벤트
    function handleCheck(id, done, index) {
        setdatas(prev => prev.map((item) => {
            return item.id === id ? {...item, done : !item.done } : item
        }))
        const todo = textTodo.current[index].textContent;
        patchDatas('http://localhost:3000/todos',id,todo,!done);
    }

    // 삭제 이벤트
    function handleDelete(id){
        deleteDatas('http://localhost:3000/todos',id);
    }

    // 수정 이벤트
    function handleEdit(id, todo, done){
        let askPrompt = prompt(`수정할 Todo를 입력해주세요!`, todo);
        if(askPrompt){
            patchDatas('http://localhost:3000/todos',id,String(askPrompt),done);
        }
    }

    // 화면뿌리기
    const data = datas.map((data,i) => {
        return (
            <li key={data.id}>
                <input type="checkbox" checked={data.done} onChange={() => handleCheck(data.id, data.done, i)} ref={checkTodo}/>
                <div>
                    <span ref={(el) => textTodo.current[i] = el}>{data.todo}</span>
                    <div className="btnWrap">
                        <button className="btnEdit" onClick={() => handleEdit(data.id, data.todo, data.done)}>수정하기</button>
                        <button className="btnDel" onClick={() => handleDelete(data.id)}>삭제하기</button>
                    </div>
                </div>
            </li>
        )
    });

    return <ul>{data}</ul>;
}

export default TodoList;
