'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteTask } from "@/actions/deleteTask";
import { getTasks } from "@/actions/getTask";
import { postTask } from "@/actions/postTask";
import { toggleDone } from "@/actions/toggle-done";
import { deleteCompletedTask } from "@/actions/clearCompletedTask";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditTask from "@/components/edit-task";
import { FilterTask, FilterType } from "@/components/filter-task";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { TaskType } from "@/types/tasks";

import { ListCheck, LoaderCircle, Plus, Trash } from "lucide-react";

import { useEffect, useState } from "react";

import { toast } from "sonner";

const Home = () => {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  const deleteTaks = false;

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
    setLoading(true);

    try {
      if (!newTask.trim()) {
        toast.warning('Digite uma tarefa válida.');
        setLoading(false);
        return; 
      } 
  
      await postTask(newTask);
      setNewTask('');
      await handleGetTask();
      toast.success('Tarefa adicionada com sucesso!');

    } catch (error) {
      toast.error('Erro ao adicionar tarefa.');
    }

    setLoading(false);
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

  const clearCompletedTasks = async () => {
    try {
      const listTasks = await deleteCompletedTask();
      
      if (!listTasks) return;

      if (listTasks.length === allTasks.length) {
        toast.warning('Nenhuma tarefa concluída para limpar.');
        return;
      }
      
      await handleGetTask();
      toast.success('Tarefas concluídas limpas com sucesso!');
    } catch (error) {
      toast.error('Erro ao limpar tarefas concluídas.');
    }
  }

  useEffect(() => {
    handleGetTask();
  }, []);

  useEffect(() => {
    switch(currentFilter) {
      case 'all':
        setFilteredTasks(allTasks);
        break;
      case 'pending':
        const pendingTask = allTasks.filter(task => !task.done)
        setFilteredTasks(pendingTask);
        break;
      case 'completed':
        const completedTask = allTasks.filter(task => task.done)
        setFilteredTasks(completedTask);
        break;
      default:
        setFilteredTasks(allTasks);
        break;
    }
  }, [currentFilter, allTasks])

  return (
    <main className="w-full h-full flex justify-center p-4">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input 
            placeholder="Adicionar tarefa" 
            onChange={(e) => setNewTask(e.target.value)} value={newTask} 
            onKeyDown={(e) => e.key === 'Enter' && handlePostTask()}
          />
          <Button className="cursor-pointer" onClick={handlePostTask}>
            {!loading &&
              <Plus />
            }
            {loading && 
              <LoaderCircle className="animate-spin" />
            }
            Cadastrar
          </Button>
        </CardHeader>
        <CardContent>
          <Separator />

          <FilterTask currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

          <div className="mt-4 border-b">
            {!allTasks.length && <p className="flex justify-center text-xs border-t p-5">Você não possui tarefas cadastradas</p>}
            {!filteredTasks.length && <p className="flex justify-center text-xs border-t p-5">Nenhuma tarefa encontrada</p> }
            {filteredTasks.map((task) => (
                <div className="flex justify-between items-center h-14 border-t" key={task.id}>
                  <div className={`w-2 h-full ${task.done ? 'bg-green-300' : 'bg-red-300' }`}></div>
                  <p 
                    className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.task}</p>
                  <div className="flex justify-between items-center gap-2">
                    <EditTask task={task} handleGetTask={handleGetTask} />
                    <Trash size={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
                  </div>
                </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={16} />
              <p className="text-xs">Tarefas concluídas ({allTasks.filter(task => task.done).length}/{allTasks.length})</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-xs h-7 cursor-pointer" variant="outline"><Trash />Limpar tarefas concluídas</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  {allTasks.filter(task => task.done).length === 0 && 
                    <AlertDialogTitle>Nenhuma tarefa concluída para excluir.</AlertDialogTitle>
                  }
                  {allTasks.filter(task => task.done).length > 0 &&
                    <AlertDialogTitle>Tem certeza que deseja excluir {allTasks.filter(task => task.done).length} itens?</AlertDialogTitle>
                  }
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction 
                    className="cursor-pointer"
                    onClick={clearCompletedTasks}
                  >Sim</AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-full bg-blue-500 rounded-md" style={{ width: `${allTasks.filter(task => task.done).length / allTasks.length * 100}%`, transition: 'width 0.3s ease' }}></div>
          </div>

          <div className="flex justify-end items-center gap-2 mt-2 text-xs text-gray-500">
            <p>{allTasks.length} tarefas no total</p>
          </div>

        </CardContent>
      </Card>
    </main>
  )
}

export default Home;