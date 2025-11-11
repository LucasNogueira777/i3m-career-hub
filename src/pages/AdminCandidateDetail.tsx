import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Mail, Phone, Linkedin, FileText, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminCandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [candidate, setCandidate] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

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
      navigate("/admin");
    }
  }, [isAdmin, loading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin && id) {
      fetchCandidateData();
    }
  }, [isAdmin, id]);

  const fetchCandidateData = async () => {
    setLoadingData(true);
    try {
      // Fetch candidate
      const { data: candidateData, error: candidateError } = await supabase
        .from('candidates')
        .select(`
          *,
          jobs (
            cargo,
            unidade_obra,
            cidade_uf,
            tipo,
            salario_faixa,
            beneficios
          )
        `)
        .eq('id', id)
        .single();

      if (candidateError) throw candidateError;
      setCandidate(candidateData);

      // Fetch history
      const { data: historyData, error: historyError } = await supabase
        .from('candidate_history')
        .select(`
          *,
          profiles (
            nome,
            email
          )
        `)
        .eq('candidate_id', id)
        .order('created_at', { ascending: false });

      if (historyError) throw historyError;
      setHistory(historyData || []);
    } catch (error: any) {
      console.error('Error fetching candidate:', error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || !user || !isAdmin || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Candidato não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o Kanban
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Candidato */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-soft border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <User className="w-6 h-6 text-primary" />
                      {candidate.nome}
                    </CardTitle>
                    <Badge className="mt-2">{candidate.fase}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{candidate.telefone}</span>
                  </div>
                  {candidate.linkedin && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Linkedin className="w-4 h-4" />
                      <a
                        href={candidate.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Ver LinkedIn
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Candidatura: {new Date(candidate.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                {candidate.cv_url && (
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => window.open(candidate.cv_url, '_blank')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Currículo
                    </Button>
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Como conheceu a vaga</h3>
                  <p className="text-muted-foreground">{candidate.origem}</p>
                </div>

                {candidate.notas && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Notas</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">{candidate.notas}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Vaga */}
            {candidate.jobs && (
              <Card className="shadow-soft border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Vaga</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{candidate.jobs.cargo}</h4>
                    <p className="text-sm text-muted-foreground">{candidate.jobs.unidade_obra} - {candidate.jobs.cidade_uf}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{candidate.jobs.tipo}</Badge>
                    {candidate.jobs.salario_faixa && (
                      <Badge variant="outline">{candidate.jobs.salario_faixa}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Histórico de Mudanças */}
          <div className="space-y-6">
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Histórico de Mudanças
                </CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhuma mudança registrada</p>
                ) : (
                  <div className="space-y-4">
                    {history.map((item) => (
                      <div key={item.id} className="border-l-2 border-primary pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.fase_anterior}
                          </Badge>
                          <span className="text-muted-foreground">→</span>
                          <Badge className="text-xs">
                            {item.fase_nova}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.profiles?.nome || 'Usuário desconhecido'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCandidateDetail;
