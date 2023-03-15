import {Fragment, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import AddTodoForm from "../appAddTodoForm/AddTodoForm";
import {API_URL} from "../../index";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {reloadToDoList} from "../utils/utils";

const AddToDo = (props) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false)
    const {encodedAuth} = useSelector(state => state)

    let button
    if (props.delete) {
        button = <Button onClick={(e) => deleteTaskFromBase()}>Удалить</Button>
    } else {
        button = <Button onClick={() => toggle()}>Редактировать</Button>;
    }


    const deleteTaskFromBase =(e)=>{
        axios.delete(API_URL+'/todos/'+props.task.id,{
            headers: {
                Authorization: `Basic ${encodedAuth}`
            }
        })
            .then(() => {
                reloadToDoList(dispatch)
            })

    }

    const toggle = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={() => toggle()}
                style={{minWidth: "200px"}}>
                Добавить новую задачу
            </Button>
        )
    }

    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader>{props.task ? "Изменить описание задачи" : "Добавить новую задачу"}</ModalHeader>
                <ModalBody>
                    <AddTodoForm
                        toggle={toggle}
                        reloadToDoList={props.reloadToDoList}
                        task={props.task}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default AddToDo