# API de Microsserviços com Node.js e CI/CD na AWS

Este repositório contém o desenvolvimento de uma API baseada em **arquitetura de microsserviços**, desenvolvida como parte da disciplina de **Tópicos Especiais em Redes**[cite: 5].

O objetivo do projeto é a implementação de serviços independentes, conteinerização e orquestração em nuvem, seguindo práticas modernas de DevOps.

##  Tecnologias e Ferramentas

* **Linguagem:** JavaScript (Node.js) [cite: 29]
* **Banco de Dados:** MySQL (Amazon RDS planejado) [cite: 18]
* **Autenticação:** JWT (JSON Web Token) [cite: 64]
* **Infraestrutura (Em progresso):** AWS ECS, Docker [cite: 16]
* **CI/CD (Em progresso):** GitHub Actions [cite: 62]

## ARCHITECTURE & SERVIÇOS

O sistema foi desenhado para operar de forma distribuída[cite: 43]:

1.  **Auth Service:** Responsável pelo login e geração de tokens JWT.
2.  **Events Service:** Gerenciamento de eventos/cadastros (CRUD).
3.  **API Gateway:** Ponto único de entrada (Planejado).

## ⚙️ Como rodar localmente

### Pré-requisitos
* Node.js instalado
* MySQL rodando localmente

### Passo a passo

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/marlondcury/trabalho_topicos_redes.git](https://github.com/marlondcury/trabalho_topicos_redes.git)
    ```

2.  Instale as dependências em cada serviço:
    ```bash
    cd auth-service && npm install
    cd ../events-service && npm install
    ```

3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` em cada pasta de serviço com as credenciais do seu banco MySQL local (DB_HOST, DB_USER, DB_PASS, etc.).

4.  Inicie os serviços:
    ```bash
    npm start
    ```

## 🗺️ Roadmap do Projeto

- [x] Implementação dos microsserviços (Node.js) [cite: 15]
- [x] Persistência de dados (MySQL) [cite: 18]
- [x] Autenticação segura (JWT) [cite: 64]
- [ ] Containerização (Docker)
- [ ] Pipeline de CI/CD (GitHub Actions) [cite: 20]
- [ ] Deploy na AWS (ECS + RDS) [cite: 13]

---
Desenvolvido por [Seu Nome] - UFES [cite: 3]