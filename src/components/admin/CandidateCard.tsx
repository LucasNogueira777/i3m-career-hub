import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CandidateCardProps {
  candidate: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    fase: string;
    created_at: string;
    jobs?: {
      cargo: string;
      unidade_obra: string;
    };
  };
}

export const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const navigate = useNavigate();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = () => {
    navigate(`/admin/candidate/${candidate.id}`);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card 
        className="cursor-pointer hover:shadow-soft transition-shadow bg-card border-border"
        onClick={handleClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              {candidate.nome}
            </CardTitle>
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing touch-none"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {candidate.jobs && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">
                {candidate.jobs.cargo}
              </p>
              <Badge variant="secondary" className="text-xs">
                {candidate.jobs.unidade_obra}
              </Badge>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span className="truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span>{candidate.telefone}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{new Date(candidate.created_at).toLocaleDateString('pt-BR')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
