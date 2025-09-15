import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";

interface JobFiltersProps {
  onFiltersChange: (filters: {
    unidade_obra: string;
    cidade_uf: string;
    tipo: string;
    search: string;
  }) => void;
}

const JobFilters = ({ onFiltersChange }: JobFiltersProps) => {
  const [filters, setFilters] = useState({
    unidade_obra: "all",
    cidade_uf: "all",
    tipo: "all",
    search: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      unidade_obra: "all",
      cidade_uf: "all",
      tipo: "all",
      search: ""
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => 
    key === "search" ? value !== "" : value !== "all"
  );

  return (
    <Card className="bg-gradient-card shadow-soft border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-foreground">
            Buscar cargo
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="search"
              placeholder="Digite o nome do cargo..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">
            Unidade/Obra
          </Label>
          <Select 
            value={filters.unidade_obra} 
            onValueChange={(value) => handleFilterChange("unidade_obra", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as unidades</SelectItem>
              <SelectItem value="Obra Centro SP">Obra Centro SP</SelectItem>
              <SelectItem value="Obra Vila Olímpia">Obra Vila Olímpia</SelectItem>
              <SelectItem value="Sede Corporativa">Sede Corporativa</SelectItem>
              <SelectItem value="Obra Barra da Tijuca">Obra Barra da Tijuca</SelectItem>
              <SelectItem value="Obra Alphaville">Obra Alphaville</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">
            Cidade/UF
          </Label>
          <Select 
            value={filters.cidade_uf} 
            onValueChange={(value) => handleFilterChange("cidade_uf", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione a cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
              <SelectItem value="São Paulo/SP">São Paulo/SP</SelectItem>
              <SelectItem value="Rio de Janeiro/RJ">Rio de Janeiro/RJ</SelectItem>
              <SelectItem value="Barueri/SP">Barueri/SP</SelectItem>
              <SelectItem value="Belo Horizonte/MG">Belo Horizonte/MG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">
            Tipo de Contrato
          </Label>
          <Select 
            value={filters.tipo} 
            onValueChange={(value) => handleFilterChange("tipo", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="CLT">CLT</SelectItem>
              <SelectItem value="Terceirizado">Terceirizado</SelectItem>
              <SelectItem value="Estágio">Estágio</SelectItem>
              <SelectItem value="Jovem Aprendiz">Jovem Aprendiz</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;