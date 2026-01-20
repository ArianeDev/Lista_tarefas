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
import { toast } from "sonner";
import { toggleDone } from "@/actions/toggle-done";

const Home = () => {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleGetTask = async () => {
    try {
      const tasks = await getTasks();
  
      if (!tasks) return;
  
      setAllTasks(tasks);
    } catch (error) {
      toast.error('Erro ao carregar tarefas.');
    }
  }

  const handlePostTask = async () => {
    try {
      if (!newTask.trim()) return toast.warning('Digite uma tarefa válida.');
  
      await postTask(newTask);
      setNewTask('');
      await handleGetTask();
      toast.success('Tarefa adicionada com sucesso!');

    } catch (error) {
      toast.error('Erro ao adicionar tarefa.');
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      if (!id) return toast.warning('Tarefa não encontrada.');

      const deletedTasks = await deleteTask(id);

      if (!deletedTasks) return;
      await handleGetTask();

      toast.success('Tarefa deletada com sucesso!');

    } catch (error) {
      toast.error('Erro ao deletar tarefa.');
    }
  }

  const handleToggleTask = async (id: number) => {
    const previusTask = [...allTasks]; // Cópia o que tem dentro da array
    
    try {
      setAllTasks((prev) => {
        const updatedTasksList = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
  
            }
          } else {
            return task;
          }
        }, [])
        return updatedTasksList;
      });
  
      await toggleDone(id);
      await handleGetTask();
      toast.success('Tarefa atualizada com sucesso!');

    } catch (error) {
      setAllTasks(previusTask);
      toast.error('Erro ao atualizar tarefa.');
    }
  }
  
  useEffect(() => {
    handleGetTask();
  }, [])

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input 
            placeholder="Adicionar tarefa" 
            onChange={(e) => setNewTask(e.target.value)} value={newTask} 
            onKeyDown={(e) => e.key === 'Enter' && handlePostTask()}
          />
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
                  <div className={`w-2 h-full ${task.done ? 'bg-green-300' : 'bg-red-300' }`}></div>
                  <p 
                    className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.task}</p>
                  <div className="flex justify-between items-center gap-2">
                    <EditTask task={task} />
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