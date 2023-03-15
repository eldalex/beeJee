import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table} from "reactstrap";
import AddToDo from "../appAddToDo/AddToDo";
import {API_URL} from "../../index";
import {useSelector, useDispatch} from "react-redux";
import {reloadToDoList} from "../utils/utils";
import {settodolist} from "../../actions";


function ToDoList() {


    const {todolist} = useSelector(state => state)
    const dispatch = useDispatch();
    const {encodedAuth} = useSelector(state => state)
    const toggleDone = (task) => {
        axios.put(API_URL + '/toggletodo', task, {headers: {'Content-Type': 'application/json', Authorization: `Basic ${encodedAuth}`}})
            .then(() => {
                reloadToDoList(dispatch)
            })
    }

    useEffect(() => {
        reloadToDoList(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sortBy = (e) => {
        const sortedData = [...todolist].sort((a, b) => a[e.target.id].localeCompare(b[e.target.id]));
        dispatch(settodolist(sortedData))
    };

    const sortByReverse = (e) => {
        const sortedData = [...todolist].sort((a, b) => b[e.target.id].localeCompare(a[e.target.id]));
        dispatch(settodolist(sortedData))
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = todolist.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>

            <Table>
                <thead>
                <tr>
                    <th className="id">id <label onClick={sortBy} id='id' className='filter'>&#9650;</label><label
                        onClick={sortByReverse} id='id' className='filter'>&#9660;</label></th>
                    <th className="user_name">Имя <label onClick={sortBy} id='user_name' className='filter'>&#9650;</label><label
                        onClick={sortByReverse} id='user_name' className='filter'>&#9660;</label></th>
                    <th className="email">email <label onClick={sortBy} id='email' className='filter'>&#9650;</label><label
                        onClick={sortByReverse} id='email' className='filter'>&#9660;</label></th>
                    <th className="text">Текст</th>
                    <th className="done">Выполнено <label onClick={sortBy} id='done' className='filter'>&#9650;</label><label
                        onClick={sortByReverse} id='done' className='filter'>&#9660;</label></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {!todolist || todolist.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Похоже что планов нет</b>
                            </td>
                        </tr>
                    ) :
                    currentItems.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.user_name}</td>
                            <td>{task.email}</td>
                            <td>{task.text}</td>
                            <td onClick={() => toggleDone(task)}>{task.done}</td>
                            <td>
                                <AddToDo
                                    create={false}
                                    task={task}
                                    reloadToDoList={reloadToDoList}
                                />
                            </td>
                            <td>
                                <AddToDo
                                    create={false}
                                    delete={true}
                                    task={task}
                                    reloadToDoList={reloadToDoList}
                                />
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <div>
                {todolist.length > itemsPerPage && (
                    <ul className="pagination">
                        {Array(Math.ceil(todolist.length / itemsPerPage))
                            .fill()
                            .map((_, i) => (
                                <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default ToDoList