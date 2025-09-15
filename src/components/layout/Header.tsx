import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">I3M Engenharia</h1>
              <p className="text-sm text-muted-foreground">Carreiras</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Vagas
            </Link>
            <Link 
              to="/privacidade" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Privacidade
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;