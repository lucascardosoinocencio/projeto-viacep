# Projeto ViaCEP — Consulta de CEP (HTML, CSS e JavaScript)

Aplicação web para **pesquisar um CEP** e exibir o **endereço completo** consumindo a API pública do **ViaCEP**.

## 🔗 Demo
- GitHub Pages: (coloque aqui quando publicar)
  Ex: https://lucascardosoinocencio.github.io/projeto-viacep/

## 🧩 Funcionalidades
- Busca de endereço pelo **CEP**
- Validação básica do CEP (ex.: tamanho e somente números)
- Exibição do resultado (logradouro, bairro, cidade, UF, etc.)
- Tratamento de erro para CEP inválido/não encontrado
- Interface simples e direta (projeto de prática)

## 🚀 Tecnologias
- **HTML5**
- **CSS3**
- **JavaScript (Fetch API + DOM)**

## 📁 Estrutura do projeto
- `index.html` — estrutura da página
- `script.js` — lógica de busca/validação e manipulação do DOM
- `estilos/` — estilos (CSS)
- `favicon-cep.svg` — ícone do projeto

## ▶️ Como rodar localmente
### Opção 1 (rápida)
1. Baixe/clone o repositório
2. Abra o arquivo `index.html` no navegador

### Opção 2 (recomendado)
Rodar com Live Server (VS Code):
1. Instale a extensão **Live Server**
2. Clique com o botão direito no `index.html`
3. **Open with Live Server**

## 🌐 Como publicar no GitHub Pages
1. Abra o repositório no GitHub → **Settings**
2. Vá em **Pages**
3. Em **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / folder: **/(root)**
4. Salve e aguarde gerar a URL do site

## ✅ Aprendizados
- Consumo de API com JavaScript
- Validação de dados de entrada
- Manipulação de DOM e feedback pro usuário
- Organização de projeto (HTML/CSS/JS separados)

## 🧠 Melhorias futuras
- Máscara de CEP (00000-000)
- Loading (spinner) durante a requisição
- Melhorar acessibilidade (aria-labels e foco)
- Salvar histórico de CEPs pesquisados (localStorage)

## 👤 Autor
**Lucas Cardoso Inocêncio**
- GitHub: https://github.com/lucascardosoinocencio
- LinkedIn: https://www.linkedin.com/in/lucas-cardoso-inoc%C3%AAncio-711b23177/

## 📄 Licença
Este projeto está sob a licença **MIT**.
