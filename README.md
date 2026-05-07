# Golden Raspberry Awards

Interface para leitura da lista de indicados e vencedores da categoria **Pior Filme** do Golden Raspberry Awards.

---

## Tecnologias Utilizadas

- Angular 21
- Angular Material
- TypeScript
- SCSS
- Vitest

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/golden-raspberry-awards.git

# Acesse a pasta
cd golden-raspberry-awards

# Instale as dependências
npm install
```

---

## Rodando o projeto

```bash
ng serve
```

Acesse no browser: [http://localhost:4200](http://localhost:4200)

---

## Rodando os testes

```bash
ng test
```

---

## Funcionalidades

### Dashboard

- Anos com mais de um vencedor
- Top 3 estúdios com mais vitórias
- Produtores com maior e menor intervalo entre vitórias
- Busca de vencedores por ano

### Lista de Filmes

- Listagem paginada de todos os filmes
- Filtro por ano
- Filtro por vencedor (Sim/Não)

---

## API

Os dados são consumidos da API:

```
https://challenge.outsera.tech/api/movies
```

Documentação: [Swagger UI](https://challenge.outsera.tech/swagger-ui/index.html)
