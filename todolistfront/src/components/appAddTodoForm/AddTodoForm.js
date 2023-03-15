import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {reloadToDoList} from "../utils/utils";
import {setEmailIsValid} from "../../actions";

function AddTodoForm(props) {
    const {encodedAuth, emailIsValid} = useSelector(state => state)
    const dispatch = useDispatch();
    const [task, setTask] = useState({});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const onChange = (e) => {
        const newTask = task
        newTask[e.target.name] = e.target.value
        if (e.target.name === 'email') {
            dispatch(setEmailIsValid(testValidEmail(e.target.value)))
        }
        setTask(newTask)
    }

    const testValidEmail = (value) => {
        return emailRegex.test(value)
    }

    useEffect(() => {
        if (props.task) {
            setTask(props.task)
        }
    }, [props.task])
    const submitNewTask = (e) => {
        e.preventDefault();
        const data = {
            "user_name": task.user_name,
            "email": task.email,
            "text": task.text,
            "done": task.done
        }
        if (emailIsValid) {
            axios.post(API_URL + '/todos', data, {headers: {'Content-Type': 'application/json'}})
                .then(() => {
                    reloadToDoList(dispatch)
                    props.toggle()
                    alert('Ваша задача успешно добавлена')
                })
        }
    };


    const submitEditTask = (e) => {
        e.preventDefault();
        axios.put(API_URL + '/todos', task, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${encodedAuth}`
            }
        })
            .then(() => {
                reloadToDoList(dispatch)
                props.toggle()
            }).catch(() => {
            props.toggle()
        })
    }
    return (
        <Form onSubmit={props.task ? submitEditTask : submitNewTask}>
            <FormGroup>
                <Label for="user_name">Имя пользователя</Label>
                <Input
                    type="text"
                    name="user_name"
                    onChange={onChange}
                    placeholder='Пожалуйста, введите имя'
                    defaultValue={props.task ? props.task.user_name : ''}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">email</Label>
                <Input
                    type="email"
                    name="email"
                    onChange={onChange}
                    placeholder='Пожалуйста, введите email'
                    defaultValue={props.task ? props.task.email : ''}
                    required
                />
                {!task.email || emailIsValid ? null : <p>Invalid email</p>}
            </FormGroup>
            <FormGroup>
                <Label for="text">Текст задачи</Label>
                <Input
                    type="textarea"
                    name="text"
                    onChange={onChange}
                    placeholder='Пожалуйста, введите описание задачи'
                    defaultValue={props.task ? props.task.text : ''}
                    required
                />
            </FormGroup>
            <Button>Send</Button> <Button onClick={props.toggle}>Cancel</Button>
        </Form>
    );
}

export default AddTodoForm;