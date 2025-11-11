import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/admin/KanbanBoard";
import { CandidateFilters } from "@/components/admin/CandidateFilters";
import { LogOut, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [filters, setFilters] = useState({
    job_id: "all",
    unidade_obra: "all",
    cidade_uf: "all"
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && !isAdmin && user) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [isAdmin, loading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      // Fetch jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (jobsError) throw jobsError;
      setJobs(jobsData || []);

      // Fetch candidates with jobs
      const { data: candidatesData, error: candidatesError } = await supabase
        .from('candidates')
        .select(`
          *,
          jobs (
            cargo,
            unidade_obra,
            cidade_uf
          )
        `)
        .order('created_at', { ascending: false });

      if (candidatesError) throw candidatesError;
      setCandidates(candidatesData || []);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (filters.job_id !== "all" && candidate.job_id !== filters.job_id) {
      return false;
    }
    if (filters.unidade_obra !== "all" && candidate.jobs?.unidade_obra !== filters.unidade_obra) {
      return false;
    }
    if (filters.cidade_uf !== "all" && candidate.jobs?.cidade_uf !== filters.cidade_uf) {
      return false;
    }
    return true;
  });

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin - I3M Engenharia</h1>
                <p className="text-sm text-muted-foreground">Sistema de Recrutamento</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Pipeline de Candidatos
            </h2>
            <p className="text-muted-foreground">
              Arraste os cards para mover candidatos entre as fases do processo seletivo
            </p>
          </div>

          <CandidateFilters
            filters={filters}
            onFiltersChange={setFilters}
            jobs={jobs}
          />

          {loadingData ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Carregando candidatos...</p>
            </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum candidato encontrado</p>
            </div>
          ) : (
            <KanbanBoard
              candidates={filteredCandidates}
              onUpdate={fetchData}
              userId={user.id}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
