export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  fullDescription: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "dental-slice",
    name: "Conversão Dental Slice",
    price: 20.0,
    description: "Conversão de arquivos tomográficos para Dental Slice",
    fullDescription:
      "Transformamos exames tomográficos em arquivos compatíveis com o Dental Slice, permitindo um planejamento cirúrgico preciso e seguro. A conversão preserva a qualidade das imagens e facilita a visualização anatômica para procedimentos como implantes, cirurgias guiadas e avaliações odontológicas.",
    icon: "🦷",
  },
  {
    id: "dicom-fusion",
    name: "Fusão Arquivo DICOM",
    price: 30.0,
    description: "Fusão de arquivos DICOM para análise integrada",
    fullDescription:
      "Realizamos a fusão de arquivos DICOM para integrar diferentes exames em um único conjunto de imagens, proporcionando uma análise mais completa e detalhada. Esse recurso auxilia no diagnóstico e no planejamento de casos complexos, oferecendo mais segurança e previsibilidade ao profissional.",
    icon: "📁",
  },
  {
    id: "dicom-stl",
    name: "Conversão DICOM/STL",
    price: 30.0,
    description: "Integração entre tomografia e escaneamento intraoral",
    fullDescription:
      "Convertemos arquivos DICOM e STL para integração entre tomografia e escaneamento intraoral, permitindo um fluxo de trabalho digital completo. Essa solução é ideal para planejamento virtual de implantes, cirurgia guiada e reabilitações protéticas, proporcionando maior precisão e previsibilidade clínica.",
    icon: "🔄",
  },
];

export interface Review {
  id: string;
  serviceId: string;
  rating: number;
  comment: string;
  author: string;
  email: string;
  date: string;
}

export const reviews: Review[] = [];
