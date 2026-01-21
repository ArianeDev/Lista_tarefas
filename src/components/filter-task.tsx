import { ArrowDownRight, Check, List } from "lucide-react"
import { Badge } from "./ui/badge"

export type FilterType = 'all' | 'pending' | 'completed';

type filterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

export const FilterTask = ({ currentFilter, setCurrentFilter } : filterProps ) => {
    return (
        <div className="flex gap-2 mt-4">
            <Badge 
              className="cursor-pointer" 
              variant={`${currentFilter === 'all' ? 'default' : 'outline'}`}
              onClick={() => setCurrentFilter('all')}
            >
              <List />Todas
            </Badge>
            <Badge 
              className="cursor-pointer" 
              variant={`${currentFilter === 'pending' ? 'default' : 'outline'}`}
              onClick={() => setCurrentFilter('pending')}
            >
              <ArrowDownRight />
              Não finalizado
            </Badge>
            <Badge 
              className="cursor-pointer" 
              variant={`${currentFilter === 'completed' ? 'default' : 'outline'}`}
              onClick={() => setCurrentFilter('completed')}
            >
              <Check />
              Concluídas
            </Badge>
        </div>
    )
}