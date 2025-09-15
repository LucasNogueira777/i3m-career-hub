import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockJobs } from "@/data/mockJobs";
import heroImage from "@/assets/hero-construction.jpg";
import { Users, Building2, Trophy, ArrowDown } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState({
    unidade_obra: "all",
    cidade_uf: "all",
    tipo: "all",
    search: ""
  });

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesUnidade = filters.unidade_obra === "all" || job.unidade_obra === filters.unidade_obra;
      const matchesCidade = filters.cidade_uf === "all" || job.cidade_uf === filters.cidade_uf;
      const matchesTipo = filters.tipo === "all" || job.tipo === filters.tipo;
      const matchesSearch = !filters.search || 
        job.cargo.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.descricao.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesUnidade && matchesCidade && matchesTipo && matchesSearch;
    });
  }, [filters]);

  const scrollToJobs = () => {
    document.getElementById('vagas-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Construa sua carreira na
            <span className="block text-accent"> I3M Engenharia</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se ao nosso time e faça parte dos projetos que transformam cidades e vidas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToJobs}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold"
            >
              Ver Vagas Disponíveis
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            <Link to="/privacidade">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Nossa Política
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 font-semibold">500+</p>
              <p className="text-white/70 text-sm">Colaboradores</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 font-semibold">50+</p>
              <p className="text-white/70 text-sm">Projetos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/90 font-semibold">25+</p>
              <p className="text-white/70 text-sm">Anos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="vagas-section" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Oportunidades de Carreira
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra as vagas disponíveis e candidate-se para fazer parte do nosso time
            </p>
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="px-4 py-2 text-base">
                {filteredJobs.length} vaga{filteredJobs.length !== 1 ? 's' : ''} encontrada{filteredJobs.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <JobFilters onFiltersChange={setFilters} />
            </div>

            {/* Jobs Grid */}
            <div className="lg:col-span-3">
              {filteredJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tente ajustar os filtros ou busque por outros termos
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({ unidade_obra: "all", cidade_uf: "all", tipo: "all", search: "" })}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
