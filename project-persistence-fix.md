# Plano de Resolução: Persistência de Projetos (ProjectForm)

## 1. Diagnóstico do Problema (Backend e Frontend)

Após inspecionar a comunicação entre o `ProjectForm.tsx` e o endpoint `/cases/` do Django, identifiquei os pontos de falha:

1. **Bug Silencioso no Parsing de Tecnologias**: O frontend envia `technologies` como uma string JSON via `FormData`. O backend tentava interpretá-la diretamente como `List[str]`, causando um erro silencioso ou falha 422 (Unprocessable Entity). (Nota: Embora parcialmente ajustado nos schemas, o erro se manifestava em chamadas de update devido a formatos legados no banco de dados e serialização incorreta).
2. **Campos Opcionais em Branco (Strings Vazias vs Null)**: Campos como `github_link` e `live_demo` enviados como strings vazias `""` podem falhar a validação do `URLField` do Django se não forem convertidos para nulo ou processados corretamente.
3. **Falta de Feedback (UI)**: O formulário usa um `alert()` nativo. Falhas na validação 422 da API são escondidas no console, frustrando a experiência do usuário.
4. **Acoplamento**: A lógica de montagem do `FormData` e a submissão estão altamente acopladas à interface de renderização (UI).

## 2. Estratégia de Solução (Múltiplos Agentes)

### Etapa 1: Backend (Ajuste Definitivo)
- Assegurar que o `ProjectIn` (`backend/engine/schemas.py`) e a view (`backend/engine/api.py`) processem os campos opcionais vazios corretamente (convertendo `""` para `None`).
- Garantir que não há mais quebras durante o parsing de `FormData`.

### Etapa 2: Frontend (Refatoração e Toasts)
- **Extração de Hook**: Criar um hook dedicado `useProjectSubmit.ts` (ou extrair para `services/`) responsável por montar o `FormData` e lidar com a chamada da API (separando a lógica de negócio da UI).
- **Tratamento de Erros e Feedback**: Implementar um sistema de Toasts customizados na aplicação, interceptando e exibindo erros 422 detalhados ao usuário (ex: "O campo Link do Github requer uma URL válida").

### Etapa 3: Validação (Testes)
- Simular uma requisição com erros de payload para verificar o disparo do Toast.
- Executar um envio correto e assegurar que as imagens são vinculadas e os dados aparecem no Painel (Dashboard).

---

> [!IMPORTANT]
> **Revisão do Plano**
> O plano envolve extrair a lógica pesada de `ProjectForm.tsx` para um Hook e adicionar toasts, além de ajustes no Django. Você aprova esta arquitetura? (Responda com "S" para continuar com a implementação).
