'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowDownRight, Check, List, ListCheck, Plus, Sigma, Trash } from "lucide-react";
import EditTask from "@/components/edit-task";
import { getTasks } from "@/actions/getTask";
import { useEffect, useState } from "react";
import { TaskType } from "@/types/tasks";
import { postTask } from "@/actions/postTask";
import { deleteTask } from "@/actions/deleteTask";

const Home = () => {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleGetTask = async () => {
    try {
      const tasks = await getTasks();
  
      if (!tasks) return;
  
      setAllTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePostTask = async () => {
    try {
      if (!newTask.trim()) return;
  
      await postTask(newTask);
      setNewTask('');
      await handleGetTask();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      if (!id) return;

      const deletedTasks = await deleteTask(id);

      if (!deletedTasks) return;
      await handleGetTask();

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleGetTask();
  }, [])

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" onChange={(e) => setNewTask(e.target.value)} value={newTask} />
          <Button className="cursor-pointer" onClick={handlePostTask}>
            <Plus />
            Cadastrar
          </Button>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="flex gap-2 mt-4">
            <Badge className="cursor-pointer" variant="default"><List />Todas</Badge>
            <Badge className="cursor-pointer" variant="outline"><ArrowDownRight />Não finalizado</Badge>
            <Badge className="cursor-pointer" variant="outline"><Check />Concluídas</Badge>
          </div>

          <div className="mt-4 border-b">
            {allTasks.map((task) => (
                <div className="flex justify-between items-center h-14 border-t" key={task.id}>
                  <div className="w-2 h-full bg-green-100"></div>
                  <p className="flex-1 px-2 text-sm">{task.task}</p>
                  <div className="flex justify-between items-center gap-2">
                    <EditTask />
                    <Trash size={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
                  </div>
                </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={16} />
              <p className="text-xs">Tarefas concluídas (3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7 cursor-pointer" variant="outline"><Trash />Limpar tarefas concluídas</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-full bg-blue-500 rounded-md" style={{ width: "50%" }}></div>
          </div>
          <div className="flex justify-end items-center gap-2 mt-2 text-xs text-gray-500">
            <Sigma size={16} />
            <p>3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Home;