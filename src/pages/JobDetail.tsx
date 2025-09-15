import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockJobs } from "@/data/mockJobs";
import { 
  MapPin, 
  Building, 
  Briefcase, 
  DollarSign, 
  Users, 
  CheckCircle, 
  ArrowLeft,
  Send
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para vagas
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="bg-gradient-card shadow-medium border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {job.cargo}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{job.unidade_obra}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{job.cidade_uf}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>{job.salario_faixa}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary-light text-primary border-primary/20">
                    {job.tipo}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Descrição da Vaga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {job.descricao}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requisitos.map((requisito, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requisito}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.beneficios.map((beneficio, index) => (
                    <Badge key={index} variant="outline" className="bg-success-light text-success border-success/20">
                      {beneficio}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-strong border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Candidate-se
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/90 mb-4">
                  Interessado nesta oportunidade? Clique no botão abaixo para se candidatar.
                </p>
                <Link to={`/apply/${job.id}`}>
                  <Button 
                    className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
                    size="lg"
                  >
                    Candidatar-se Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Info */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Informações da Vaga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Tipo de Contrato
                  </div>
                  <p className="font-semibold text-foreground">{job.tipo}</p>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Faixa Salarial
                  </div>
                  <p className="font-semibold text-foreground">{job.salario_faixa}</p>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Users className="w-4 h-4 mr-2" />
                    Gestor Responsável
                  </div>
                  <p className="font-semibold text-foreground">{job.gestor_nome}</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Sobre a I3M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A I3M Engenharia é uma empresa líder no setor de construção civil, 
                  com mais de 25 anos de experiência em projetos residenciais, 
                  comerciais e de infraestrutura.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetail;