import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export interface ProjectFormData {
  title: string;
  category: string;
  problem_statement: string;
  solution_architecture: string;
  impact_metrics: string;
  technologies: string;
  github_link: string;
  live_demo: string;
}

export function useProjectSubmit(id?: string) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submitForm = async (
    formData: ProjectFormData, 
    coverImage: File | null, 
    demoVideo: File | null, 
    galleryImages: File[]
  ) => {
    setLoading(true);
    setErrorMsg(null); // Limpa erros antigos

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('problem_statement', formData.problem_statement);
    data.append('solution_architecture', formData.solution_architecture);
    data.append('impact_metrics', formData.impact_metrics);
    data.append('github_link', formData.github_link);
    data.append('live_demo', formData.live_demo);
    
    // Processamento de tecnologias
    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t !== "");
    data.append('technologies', JSON.stringify(techArray));

    if (coverImage) data.append('cover_image', coverImage);
    if (demoVideo) data.append('demo_video', demoVideo);
    
    galleryImages.forEach((file) => {
      data.append('gallery_images', file);
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };

      if (id) {
        await api.post(`/cases/${id}`, data, config);
      } else {
        await api.post('/cases/', data, config);
      }
      navigate('/admin');
    } catch (err: any) {
      console.error("Erro 422/500:", err);
      
      // Tratamento amigável de erro da API
      const responseData = err.response?.data;
      if (err.response?.status === 422 && responseData?.detail) {
        // Ninja retorna array de erros em 'detail'
        const firstError = Array.isArray(responseData.detail) 
            ? `${responseData.detail[0].loc?.join('.')}: ${responseData.detail[0].msg}`
            : JSON.stringify(responseData.detail);
        setErrorMsg(`Erro de Validação: ${firstError}`);
      } else {
        setErrorMsg(responseData?.message || "Ocorreu um erro inesperado na sincronização.");
      }
      
      return false; // Retorna falha
    } finally {
      setLoading(false);
    }
    return true; // Retorna sucesso
  };

  return { submitForm, loading, errorMsg, setErrorMsg };
}
