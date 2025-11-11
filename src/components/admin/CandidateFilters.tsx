import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface CandidateFiltersProps {
  filters: {
    job_id: string;
    unidade_obra: string;
    cidade_uf: string;
  };
  onFiltersChange: (filters: any) => void;
  jobs: Array<{ id: string; cargo: string; unidade_obra: string; cidade_uf: string }>;
}

export const CandidateFilters = ({ filters, onFiltersChange, jobs }: CandidateFiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      job_id: "all",
      unidade_obra: "all",
      cidade_uf: "all"
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "all");

  // Get unique values for filters
  const uniqueUnidades = Array.from(new Set(jobs.map(j => j.unidade_obra)));
  const uniqueCidades = Array.from(new Set(jobs.map(j => j.cidade_uf)));

  return (
    <Card className="bg-gradient-card shadow-soft border-border">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por Vaga */}
          <div className="space-y-2">
            <Label htmlFor="filter-job" className="text-sm font-medium text-foreground">
              Vaga
            </Label>
            <Select
              value={filters.job_id}
              onValueChange={(value) => handleFilterChange("job_id", value)}
            >
              <SelectTrigger id="filter-job" className="bg-background border-border">
                <SelectValue placeholder="Todas as vagas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as vagas</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.cargo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Unidade/Obra */}
          <div className="space-y-2">
            <Label htmlFor="filter-unidade" className="text-sm font-medium text-foreground">
              Unidade/Obra
            </Label>
            <Select
              value={filters.unidade_obra}
              onValueChange={(value) => handleFilterChange("unidade_obra", value)}
            >
              <SelectTrigger id="filter-unidade" className="bg-background border-border">
                <SelectValue placeholder="Todas as unidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as unidades</SelectItem>
                {uniqueUnidades.map((unidade) => (
                  <SelectItem key={unidade} value={unidade}>
                    {unidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Cidade/UF */}
          <div className="space-y-2">
            <Label htmlFor="filter-cidade" className="text-sm font-medium text-foreground">
              Cidade/UF
            </Label>
            <Select
              value={filters.cidade_uf}
              onValueChange={(value) => handleFilterChange("cidade_uf", value)}
            >
              <SelectTrigger id="filter-cidade" className="bg-background border-border">
                <SelectValue placeholder="Todas as cidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cidades</SelectItem>
                {uniqueCidades.map((cidade) => (
                  <SelectItem key={cidade} value={cidade}>
                    {cidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
