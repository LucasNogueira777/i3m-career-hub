import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Briefcase, ArrowRight } from "lucide-react";

interface Job {
  id: string;
  cargo: string;
  unidade_obra: string;
  cidade_uf: string;
  tipo: string;
  salario_faixa: string;
  beneficios: string[];
  descricao: string;
  requisitos: string[];
  status: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
            {job.cargo}
          </CardTitle>
          <Badge variant="secondary" className="bg-primary-light text-primary border-primary/20">
            {job.tipo}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Building className="w-4 h-4 mr-2" />
            <span>{job.unidade_obra}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.cidade_uf}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{job.salario_faixa}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {job.descricao}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.beneficios.slice(0, 3).map((beneficio, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {beneficio}
            </Badge>
          ))}
          {job.beneficios.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.beneficios.length - 3} mais
            </Badge>
          )}
        </div>
        
        <Link to={`/vaga/${job.id}`}>
          <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
            Ver detalhes
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;