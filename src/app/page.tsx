import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowDownRight, Check, List, Plus } from "lucide-react";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa"/>
          <Button className="cursor-pointer"> 
            <Plus />
            Cadastrar
          </Button>
        </CardHeader>
        
        <CardContent>
          <Separator />
          <div className="flex gap-2">
            <Badge className="cursor-pointer"><List />Todas</Badge>
            <Badge className="cursor-pointer"><ArrowDownRight />Não finalizado</Badge>
            <Badge className="cursor-pointer"><Check />Concluídas</Badge>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Home;