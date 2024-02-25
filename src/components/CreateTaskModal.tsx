import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "../App";

interface CreateTaksModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setTasks: (tasks: Task) => void;

}

export function CreateTaksModal(props: CreateTaksModalProps) {
  const [taskName, setTaskName] = useState("");

  function handleCreateTask() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      text: taskName,
      done: false,
    };
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    setTaskName("");
    props.setTasks((tasks:Task[]) => [...tasks, newTask]);
    props.onClose();
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Receita</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <FormLabel>Sua receita</FormLabel> */}
            <Input
            onChange={(e) => setTaskName(e.target.value)}></Input>
          </ModalBody>
          <ModalFooter>
          <Button className="button-modal" colorScheme="green" onClick={() => handleCreateTask()}>
              Adicionar
            </Button>
            <Button className="button-modal" colorScheme="red" mr={3} onClick={props.onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
