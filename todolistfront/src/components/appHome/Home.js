import {Container, Row, Col} from "reactstrap";
import ToDoList from "../appToDoList/ToDoList";
import AddToDo from "../appAddToDo/AddToDo";
import {reloadToDoList} from "../utils/utils";
import LoginForm from "../appLoginForm/LoginForm";
import {useSelector} from "react-redux";


const Home = () => {
    const {todolist} = useSelector(state => state)
    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ToDoList
                        todolist={todolist}
                        reloadToDoList={reloadToDoList}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddToDo
                        create={true}
                        newTask={true}
                        reloadToDoList={reloadToDoList}
                    />
                </Col>
                <Col>
                    <LoginForm/>
                </Col>
            </Row>
            <Row>

            </Row>
        </Container>
    )
}

export default Home;