# API de Microsserviços com Node.js e CI/CD na AWS

[![CI Pipeline - Sistema CA-SI 🚀](https://github.com/marlondcury/trabalho_topicos_redes/actions/workflows/ci.yml/badge.svg)](https://github.com/marlondcury/trabalho_topicos_redes/actions/workflows/ci.yml)

Este repositório contém o desenvolvimento de uma API baseada em **arquitetura de microsserviços**, desenvolvida como parte da disciplina de **Tópicos Especiais em Redes**.

O objetivo do projeto é a implementação de serviços independentes, conteinerização e orquestração em nuvem, seguindo práticas modernas de DevOps.

##  Tecnologias e Ferramentas

* **Linguagem:** JavaScript (Node.js) 
* **Banco de Dados:** MySQL (Amazon RDS planejado)
* **Autenticação:** JWT (JSON Web Token) 
* **Infraestrutura (Em progresso):** AWS ECS, Docker 
* **CI/CD (Em progresso):** GitHub Actions 

## ARCHITECTURE & SERVIÇOS

O sistema foi desenhado para operar de forma distribuída:

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

- [x] Implementação dos microsserviços (Node.js) 
- [x] Persistência de dados (MySQL) 
- [x] Autenticação segura (JWT)
- [x] Containerização (Docker)
- [x]  Pipeline de CI/CD (GitHub Actions) 
- [x] Deploy na AWS (ECS + RDS) 

---
Desenvolvido por Marlon Domingos Cury - UFES 
