export interface Job {
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
  gestor_nome: string;
  gestor_email: string;
}

export const mockJobs: Job[] = [
  {
    id: "1",
    cargo: "Engenheiro Civil Senior",
    unidade_obra: "Obra Centro SP",
    cidade_uf: "São Paulo/SP",
    tipo: "CLT",
    salario_faixa: "R$ 8.000 - R$ 12.000",
    beneficios: ["Vale Refeição", "Vale Transporte", "Plano de Saúde", "Plano Odontológico", "Participação nos Lucros"],
    descricao: "Responsável pelo planejamento, execução e controle de obras de construção civil, garantindo o cumprimento de prazos, qualidade e segurança. Elaboração de projetos estruturais e acompanhamento de equipes técnicas.",
    requisitos: [
      "Graduação em Engenharia Civil",
      "CREA ativo",
      "Mínimo 5 anos de experiência em obras",
      "Conhecimento em AutoCAD e MS Project",
      "Experiência em gestão de equipes"
    ],
    status: "ativo",
    gestor_nome: "Carlos Silva",
    gestor_email: "carlos.silva@i3mengenharia.com.br"
  },
  {
    id: "2",
    cargo: "Técnico em Segurança do Trabalho",
    unidade_obra: "Obra Vila Olímpia",
    cidade_uf: "São Paulo/SP",
    tipo: "CLT",
    salario_faixa: "R$ 4.500 - R$ 6.500",
    beneficios: ["Vale Refeição", "Vale Transporte", "Plano de Saúde", "Cesta Básica"],
    descricao: "Responsável por implementar e manter programas de segurança do trabalho, realizar inspeções de segurança, treinar funcionários sobre normas de segurança e investigar acidentes de trabalho.",
    requisitos: [
      "Curso Técnico em Segurança do Trabalho",
      "Registro no MTE",
      "Conhecimento em NRs",
      "Experiência mínima de 2 anos",
      "Curso de primeiros socorros"
    ],
    status: "ativo",
    gestor_nome: "Ana Costa",
    gestor_email: "ana.costa@i3mengenharia.com.br"
  },
  {
    id: "3",
    cargo: "Estagiário de Engenharia",
    unidade_obra: "Sede Corporativa",
    cidade_uf: "São Paulo/SP",
    tipo: "Estágio",
    salario_faixa: "R$ 1.200 - R$ 1.800",
    beneficios: ["Vale Transporte", "Auxílio Alimentação", "Seguro de Vida"],
    descricao: "Oportunidade para estudantes de engenharia civil ou áreas correlatas. Apoio em atividades de projetos, acompanhamento de obras e desenvolvimento de estudos técnicos.",
    requisitos: [
      "Cursando Engenharia Civil ou correlatos",
      "A partir do 6º semestre",
      "Conhecimentos básicos em AutoCAD",
      "Proatividade e interesse em aprender",
      "Disponibilidade de 6 horas diárias"
    ],
    status: "ativo",
    gestor_nome: "Roberto Mendes",
    gestor_email: "roberto.mendes@i3mengenharia.com.br"
  },
  {
    id: "4",
    cargo: "Pedreiro de Alvenaria",
    unidade_obra: "Obra Barra da Tijuca",
    cidade_uf: "Rio de Janeiro/RJ",
    tipo: "Terceirizado",
    salario_faixa: "R$ 2.800 - R$ 4.200",
    beneficios: ["Vale Transporte", "Cesta Básica", "EPI Fornecidos"],
    descricao: "Execução de serviços de alvenaria, revestimentos e acabamentos. Trabalho em equipe seguindo rigorosamente as normas de segurança e qualidade da empresa.",
    requisitos: [
      "Experiência comprovada em alvenaria",
      "Conhecimento em leitura de plantas",
      "Disponibilidade para trabalhar em altura",
      "Ensino fundamental completo",
      "Carteira de trabalho atualizada"
    ],
    status: "ativo",
    gestor_nome: "João Santos",
    gestor_email: "joao.santos@i3mengenharia.com.br"
  },
  {
    id: "5",
    cargo: "Arquiteto de Projetos",
    unidade_obra: "Sede Corporativa",
    cidade_uf: "São Paulo/SP",
    tipo: "CLT",
    salario_faixa: "R$ 6.000 - R$ 9.000",
    beneficios: ["Vale Refeição", "Plano de Saúde", "Plano Odontológico", "Home Office Híbrido", "Participação nos Lucros"],
    descricao: "Desenvolvimento de projetos arquitetônicos residenciais e comerciais, compatibilização com projetos complementares e acompanhamento da execução das obras.",
    requisitos: [
      "Graduação em Arquitetura e Urbanismo",
      "CAU ativo",
      "Experiência em projetos residenciais",
      "Domínio em AutoCAD, SketchUp e Revit",
      "Portfolio de projetos executados"
    ],
    status: "ativo",
    gestor_nome: "Maria Oliveira",
    gestor_email: "maria.oliveira@i3mengenharia.com.br"
  },
  {
    id: "6",
    cargo: "Jovem Aprendiz - Administrativo",
    unidade_obra: "Obra Alphaville",
    cidade_uf: "Barueri/SP",
    tipo: "Jovem Aprendiz",
    salario_faixa: "R$ 800 - R$ 1.200",
    beneficios: ["Vale Transporte", "Auxílio Alimentação", "Curso Profissionalizante"],
    descricao: "Programa de formação profissional com atividades administrativas, apoio na organização de documentos, atendimento telefônico e suporte às equipes operacionais.",
    requisitos: [
      "Idade entre 14 e 24 anos",
      "Ensino médio em andamento ou concluído",
      "Conhecimentos básicos em informática",
      "Interesse em área administrativa",
      "Disponibilidade de meio período"
    ],
    status: "ativo",
    gestor_nome: "Patricia Lima",
    gestor_email: "patricia.lima@i3mengenharia.com.br"
  }
];