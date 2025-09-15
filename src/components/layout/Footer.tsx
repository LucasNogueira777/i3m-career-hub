import { Building2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">I3M Engenharia</h3>
                <p className="text-sm opacity-80">Construindo o futuro</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Empresa líder em engenharia e construção, oferecendo soluções inovadoras 
              e sustentáveis para projetos de infraestrutura.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>carreiras@i3mengenharia.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Oportunidades</h4>
            <div className="space-y-2 text-sm">
              <p>Junte-se ao nosso time de profissionais qualificados</p>
              <p className="opacity-80">
                Enviamos seu currículo e aguarde nosso contato para novas oportunidades.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-light/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 I3M Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;