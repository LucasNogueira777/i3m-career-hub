import { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CandidateCard } from "./CandidateCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FASES = [
  "Triagem",
  "Gestor",
  "Técnica",
  "Documentos",
  "Proposta",
  "Admissão"
];

interface Candidate {
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
}

interface KanbanBoardProps {
  candidates: Candidate[];
  onUpdate: () => void;
  userId: string;
}

export const KanbanBoard = ({ candidates, onUpdate, userId }: KanbanBoardProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const candidatesByFase = useMemo(() => {
    const grouped: Record<string, Candidate[]> = {};
    FASES.forEach(fase => {
      grouped[fase] = candidates.filter(c => c.fase === fase);
    });
    return grouped;
  }, [candidates]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const candidateId = active.id as string;
    const novaFase = over.id as string;

    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate || candidate.fase === novaFase) return;

    const faseAnterior = candidate.fase;

    try {
      // Update candidate fase
      const { error: updateError } = await supabase
        .from('candidates')
        .update({ fase: novaFase })
        .eq('id', candidateId);

      if (updateError) throw updateError;

      // Record history
      const { error: historyError } = await supabase
        .from('candidate_history')
        .insert({
          candidate_id: candidateId,
          user_id: userId,
          fase_anterior: faseAnterior,
          fase_nova: novaFase
        });

      if (historyError) throw historyError;

      toast({
        title: "Fase atualizada!",
        description: `Candidato movido para ${novaFase}`
      });

      onUpdate();
    } catch (error: any) {
      console.error('Error updating candidate:', error);
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const activeCandidate = activeId
    ? candidates.find(c => c.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {FASES.map((fase) => (
          <SortableContext
            key={fase}
            id={fase}
            items={candidatesByFase[fase].map(c => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <Card className="bg-muted/30 border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center justify-between">
                  {fase}
                  <Badge variant="secondary" className="ml-2">
                    {candidatesByFase[fase].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 min-h-[200px]">
                {candidatesByFase[fase].map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </CardContent>
            </Card>
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeCandidate ? (
          <div className="rotate-3 opacity-90">
            <CandidateCard candidate={activeCandidate} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
