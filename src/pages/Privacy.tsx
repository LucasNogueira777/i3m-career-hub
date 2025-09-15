import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-muted-foreground">
              Como coletamos, utilizamos e protegemos seus dados pessoais
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Última atualização: 15 de setembro de 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Introdução */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <FileText className="w-5 h-5 mr-2" />
                  1. Introdução
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  A I3M Engenharia está comprometida com a proteção da sua privacidade e dos seus dados pessoais. 
                  Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos 
                  as informações que você nos fornece através do nosso portal de carreiras.
                </p>
                <p>
                  Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
                  e demais legislações aplicáveis sobre proteção de dados pessoais.
                </p>
              </CardContent>
            </Card>

            {/* Dados Coletados */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Eye className="w-5 h-5 mr-2" />
                  2. Dados Pessoais Coletados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Para o processo de recrutamento e seleção, coletamos os seguintes dados pessoais:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Dados de identificação:</strong> nome completo, email, telefone</li>
                  <li><strong>Dados profissionais:</strong> currículo (PDF), histórico profissional, experiências</li>
                  <li><strong>Dados de contato:</strong> perfil do LinkedIn (quando fornecido)</li>
                  <li><strong>Dados de origem:</strong> como conheceu a vaga (para fins estatísticos)</li>
                  <li><strong>Dados de navegação:</strong> endereço IP, cookies, informações do dispositivo</li>
                </ul>
              </CardContent>
            </Card>

            {/* Finalidade */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Lock className="w-5 h-5 mr-2" />
                  3. Finalidade do Tratamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Utilizamos seus dados pessoais para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Processos de recrutamento e seleção</li>
                  <li>Avaliação de perfil profissional e adequação às vagas</li>
                  <li>Comunicação sobre oportunidades de emprego</li>
                  <li>Formação de banco de talentos para futuras oportunidades</li>
                  <li>Cumprimento de obrigações legais e regulatórias</li>
                  <li>Melhoria dos nossos processos de recrutamento</li>
                </ul>
              </CardContent>
            </Card>

            {/* Base Legal */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-foreground">4. Base Legal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Consentimento:</strong> mediante sua autorização expressa</li>
                  <li><strong>Execução de procedimentos preliminares:</strong> relacionados ao contrato de trabalho</li>
                  <li><strong>Legítimo interesse:</strong> para formação de banco de talentos</li>
                  <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
                </ul>
              </CardContent>
            </Card>

            {/* Compartilhamento */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-foreground">5. Compartilhamento de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Seus dados pessoais poderão ser compartilhados nas seguintes situações:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Com gestores e equipe de RH da I3M Engenharia</li>
                  <li>Com fornecedores de serviços de TI (sob contrato de confidencialidade)</li>
                  <li>Quando exigido por lei ou ordem judicial</li>
                  <li>Para proteção dos direitos e segurança da empresa</li>
                </ul>
                <p>
                  <strong>Importante:</strong> Não vendemos, alugamos ou comercializamos seus dados pessoais 
                  com terceiros para fins comerciais.
                </p>
              </CardContent>
            </Card>

            {/* Armazenamento */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-foreground">6. Armazenamento e Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Seus dados são armazenados em servidores seguros e protegidos por medidas técnicas e 
                  organizacionais adequadas, incluindo:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Criptografia de dados sensíveis</li>
                  <li>Controle de acesso restrito</li>
                  <li>Monitoramento de segurança 24/7</li>
                  <li>Backup regular dos dados</li>
                  <li>Treinamento da equipe sobre segurança da informação</li>
                </ul>
                <p>
                  <strong>Retenção:</strong> Seus dados serão mantidos pelo período necessário para as 
                  finalidades descritas, ou conforme exigido por lei, sendo excluídos após este período.
                </p>
              </CardContent>
            </Card>

            {/* Direitos do Titular */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-foreground">7. Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  De acordo com a LGPD, você possui os seguintes direitos:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Acesso:</strong> confirmar a existência e acessar seus dados</li>
                  <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li><strong>Eliminação:</strong> solicitar a exclusão de dados desnecessários</li>
                  <li><strong>Portabilidade:</strong> solicitar a transferência de dados para outro fornecedor</li>
                  <li><strong>Oposição:</strong> opor-se ao tratamento com base no legítimo interesse</li>
                  <li><strong>Revogação do consentimento:</strong> retirar o consentimento a qualquer momento</li>
                </ul>
                <div className="bg-primary-light p-4 rounded-lg mt-4">
                  <p className="font-semibold text-primary">
                    Para exercer seus direitos, entre em contato conosco:
                  </p>
                  <p className="mt-2">
                    Email: <a href="mailto:privacidade@i3mengenharia.com.br" className="text-primary hover:underline">
                      privacidade@i3mengenharia.com.br
                    </a>
                  </p>
                  <p>Telefone: (11) 3456-7890</p>
                </div>
              </CardContent>
            </Card>

            {/* Alterações */}
            <Card className="bg-gradient-card shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-foreground">8. Alterações na Política</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Esta Política de Privacidade pode ser atualizada periodicamente. Quando isso ocorrer, 
                  notificaremos você através do email cadastrado ou por meio de aviso em nosso site.
                </p>
                <p>
                  Recomendamos que você consulte esta página regularmente para se manter informado 
                  sobre como protegemos suas informações.
                </p>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-strong border-0">
              <CardHeader>
                <CardTitle>Contato - Encarregado de Dados (DPO)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  Para dúvidas sobre esta política ou exercício dos seus direitos:
                </p>
                <div className="space-y-1">
                  <p><strong>Email:</strong> privacidade@i3mengenharia.com.br</p>
                  <p><strong>Telefone:</strong> (11) 3456-7890</p>
                  <p><strong>Endereço:</strong> São Paulo/SP</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;