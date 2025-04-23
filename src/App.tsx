import './App.css'
import {TodoTable} from "@/components/todo-table.tsx";
import {CreateTodoDialog} from "@/components/create-todo-dialog.tsx";


const App = () => {
    return (
        <div className={'w-full h-screen p-20'}>
            <div className={'w-full flex justify-end p-5'}>
            <CreateTodoDialog/>
            </div>
            <TodoTable/>
        </div>

    );
};

export default App;
