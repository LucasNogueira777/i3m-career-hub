import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";

const applicationSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  origem: z.string().min(1, "Selecione como conheceu a vaga"),
  linkedin: z.string().url("URL do LinkedIn inválida").optional().or(z.literal("")),
  cv_file: z.any().refine((file) => file && file.length > 0, "CV é obrigatório"),
  lgpd_consent: z.boolean().refine((val) => val === true, "Você deve aceitar os termos de privacidade"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const JobApplication = () => {
  const { jobId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [job, setJob] = useState<any>(null);
  const [loadingJob, setLoadingJob] = useState(true);

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      origem: "",
      linkedin: "",
      lgpd_consent: false,
    },
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .maybeSingle();
        
        if (error) throw error;
        setJob(data);
      } catch (error: any) {
        console.error('Error fetching job:', error);
        toast({
          title: "Erro ao carregar vaga",
          description: "Não foi possível carregar os detalhes da vaga",
          variant: "destructive"
        });
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId, toast]);

  if (loadingJob) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-muted-foreground">Carregando vaga...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return <Navigate to="/" replace />;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Erro no arquivo",
          description: "Por favor, envie apenas arquivos PDF",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      form.setValue("cv_file", [file]);
      form.clearErrors("cv_file");
    }
  };

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    
    try {
      if (!uploadedFile) {
        throw new Error("Arquivo de CV não encontrado");
      }

      // Upload CV to storage
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(filePath, uploadedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('cvs')
        .getPublicUrl(filePath);

      // Insert candidate
      const { error: insertError } = await supabase
        .from('candidates')
        .insert({
          job_id: jobId,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          origem: data.origem,
          linkedin: data.linkedin || null,
          cv_url: publicUrl,
          fase: 'Triagem'
        });

      if (insertError) throw insertError;
      
      toast({
        title: "Candidatura enviada com sucesso!",
        description: "Entraremos em contato em breve. Boa sorte!",
      });
      
      // Reset form
      form.reset();
      setUploadedFile(null);
      
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Erro ao enviar candidatura",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to={`/vaga/${job.id}`}>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para vaga
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Job Info Header */}
          <Card className="bg-gradient-card shadow-soft border-border mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                Candidatar-se para: {job.cargo}
              </CardTitle>
              <p className="text-muted-foreground">{job.unidade_obra} - {job.cidade_uf}</p>
            </CardHeader>
          </Card>

          {/* Application Form */}
          <Card className="bg-gradient-card shadow-medium border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Dados do Candidato</CardTitle>
              <p className="text-muted-foreground">
                Preencha todos os campos obrigatórios para se candidatar à vaga
              </p>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nome */}
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Telefone */}
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Como conheceu a vaga */}
                  <FormField
                    control={form.control}
                    name="origem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Como conheceu esta vaga? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="site">Site da empresa</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="indeed">Indeed</SelectItem>
                            <SelectItem value="catho">Catho</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* LinkedIn */}
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn (opcional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://www.linkedin.com/in/seuperfil" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="cv-upload">Currículo (PDF) *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      {uploadedFile ? (
                        <div className="flex items-center justify-center space-x-2 text-success">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">{uploadedFile.name}</span>
                          <span className="text-muted-foreground">
                            ({(uploadedFile.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <FileText className="w-8 h-8 text-muted-foreground mx-auto" />
                          <p className="text-muted-foreground">
                            Clique para selecionar ou arraste seu CV aqui
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Apenas arquivos PDF até 10MB
                          </p>
                        </div>
                      )}
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    {form.formState.errors.cv_file && (
                      <p className="text-sm text-destructive">
                        {String(form.formState.errors.cv_file.message)}
                      </p>
                    )}
                  </div>

                  {/* LGPD Consent */}
                  <FormField
                    control={form.control}
                    name="lgpd_consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            Aceito os termos de privacidade *
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Ao marcar esta opção, você autoriza o tratamento dos seus dados pessoais 
                            conforme nossa{" "}
                            <Link 
                              to="/privacidade" 
                              className="text-primary hover:underline"
                              target="_blank"
                            >
                              Política de Privacidade
                            </Link>
                          </p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Enviando candidatura...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Enviar Candidatura
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobApplication;
