import {
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoListCircleOutline  } from "react-icons/io5";
import { CreateTaksModal } from "./components/CreateTaskModal";
import { EditTaskModal } from "./components/EditTaskModal";
import  "./App.css";
import "./index.css"
import "./assets/cook.png"
import "./assets/image.png"

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

function App() {
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  return (
    <>
    <div className="back">
      <Flex flex="1" px="30" direction="column">
        <Stack spacing="10">
          <div className="header">
            <img src="./src/assets/cook.png" width={"100"} height={100}  alt="Cook logo" />
          <Heading>Livro de Receitas Online</Heading></div>
          <Stack>
            <div className="filter">
            {/* <Button onClick={
              () => {
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                setTasks(storedTasks);
              }
            } >Todas</Button> */}
                {/* <Button onClick={
              () => {
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                const newTasks = storedTasks.filter((task: Task) => !task.done);
                setTasks(newTasks);}
            }
            >Em andamento</Button> */}
            {/* <Button onClick={
              () => {
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                const newTasks = storedTasks.filter((task: Task) => task.done);
                setTasks(newTasks);
            }}
            >Concluída</Button> */}
        </div>
          </Stack>
          <List spacing={3}>
            {tasks.map((todo) => (
              <ListItem key={todo.id}>
                <ListIcon as={IoListCircleOutline } width={"5"} height={"5"}/>
                {todo.text}
                <div className="objects-btn">
                {/* <Button
                  onClick={() => {
                    const newTasks = tasks.map((task) => {
                      if (task.id === todo.id) {
                        task.done = !task.done;
                      }
                      return task;
                    });
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  {todo.done ? "Desfazer" : "Fazer"}
                </Button> */}
               <Button className="button-modal"
                  onClick={() => {
                    setSelectedTask(todo);
                    onOpenEditModal();
                  }}
                >
                  Editar
                </Button>
                 <Button className="button-modal"
                  onClick={() => {
                    const newTasks = tasks.filter(
                      (task) => task.id !== todo.id
                    );
                    setTasks(newTasks);
                    localStorage.setItem("tasks", JSON.stringify(newTasks));
                  }}
                >
                  Excluir
                </Button></div>
                {isOpenEditModal && (
                  <EditTaskModal
                    key={todo.id}
                    isOpen={isOpenEditModal}
                    onClose={onCloseEditModal}
                    onOpen={onOpenEditModal}
                    setTasks={setTasks}
                    selectedTask={selectedTask as Task}
                  />
                )}
              </ListItem>
            ))}
          </List>
          <Box>
            <Button className="add" onClick={onOpenCreateModal}>Adicionar Receitas</Button>
          </Box>
        </Stack>
      </Flex>
      <CreateTaksModal
        setTasks={setTasks}
        isOpen={isOpenCreateModal}
        onOpen={onOpenCreateModal}
        onClose={onCloseCreateModal}
      />
      </div>
    </>
  );
}

export default App;
