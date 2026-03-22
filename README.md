![CI Status](https://github.com/Mysterion147/k6-performance-suite/actions/workflows/performance.yml/badge.svg)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)

[Leia em Português<img src="https://flagcdn.com/w20/br.png" width="20">](#versão-em-português) | [Read in English<img src="https://flagcdn.com/w20/us.png" width="20">](#english-version)

# API Performance & Resilience Suite with K6 (CI/CD Ready✅)

---

## English Version
This project features a high-performance testing suite developed with **k6**. It aims to validate system scalability, reliability, and recovery through various load-testing strategies, simulating real-world high-traffic scenarios. The project is automated with GitHub Actions.

## ⚙️ CI/CD Integration (GitHub Actions)

This project is fully automated using **GitHub Actions** to ensure performance integrity through an automated pipeline that focuses on **continuous delivery (CD) of test artifacts**.

* **Workflow Pipeline**: 
    1. Clones both Test Suite and [Performance API](https://github.com/Mysterion147/performance-test-api) repositories.
    2. Spins up a Node.js environment to run the API as a sidecar service.
    3. Executes the **k6 Performance Suite** with pre-defined thresholds.
    4. **Automated Reporting**: On every push to `main`, a new HTML report is generated and deployed to GitHub Pages.

#### 📊 Performance Report
You can access the latest automated execution report here:
[**View Live Performance Report 📈**](https://Mysterion147.github.io/k6-performance-suite/reports/complete-suite-report.html)

#### 🛡️ Quality Gates (Thresholds)
The build will **fail** if:
* **P(95)** of requests exceeds **700ms** (Latency Gate).
* Error rate is higher than **1%** (excluding the deliberate `/unstable` scenario).

## ⭐ Project Goals
* Evaluate API behavior under different load profiles (Load, Stress, Spike, Soak).
* Detect memory leaks and performance degradation over time.
* Validate system resilience and recovery after sudden traffic bursts.
* Integrate automated performance thresholds for CI/CD readiness.
### Target: simple Fastify API, you can check it [here](https://github.com/Mysterion147/performance-test-api).

## 🛠️ Tech Stack
* **Tool:** k6 (Grafana)
* **Scripting:** JavaScript (ES6)
* **Reporting:** k6-reporter (HTML visual reports). Credits to the [author](https://github.com/benc-uk/k6-reporter)

## 🏗️ Suite Structure
The suite is consolidated into a single entry point (`performance-suite.js`) using **Scenarios**, allowing multiple tests to run in isolation or parallel:

1. **Load Test**: Steady traffic to establish a performance baseline.
2. **Stress Test**: Gradually increasing load to find the system's breaking point.
3. **Spike Test**: Sudden, massive traffic bursts to test immediate elasticity.
4. **Soak Test**: Long-duration testing to find resource leaks (memory/CPU).
5. **Unstable & Slow Routes**: Specific scenarios for endpoints with high latency or random failures to check behavior.
6. **High Demand (POST)**: Simulates a real checkout flow with dynamic data and user "think time".

## 💡 Key Technical Insights
* **Advanced Thresholds**: Each scenario has its own performance budget (e.g., p(95) < 200ms for fast routes and p(95) < 600ms for complex POSTs), ensuring precise failure detection.
* **Dynamic Data Simulation**: Implementation of `randomIntBetween` to generate unique UserIDs and ProductIDs, preventing database caching from skewing results.
* **Groups & Scenarios**: Used to organize the report and allow the engine to run multiple test types in a single execution.

## 🚀 How to Run
1. Install k6: `brew install k6` (macOS), `winget install k6` (Windows) or download from [k6.io].
2. Clone this repository.
3. Run the complete suite:
   `k6 run complete-suite/performance-suite.js`

---

## Versão em Português
Este projeto apresenta uma suíte de testes de alta performance desenvolvida com **k6**. O objetivo é validar a escalabilidade, confiabilidade e recuperação do sistema através de diversas estratégias de carga, simulando cenários reais de alto tráfego. O projeto é automatizado utilizando GitHub Actions.

### ⚙️ Integração CI/CD (GitHub Actions)

Este projeto é totalmente automatizado via **GitHub Actions** para garantir a integridade da performance através de um pipeline automatizado que foca na **entrega contínua (CD) de artefatos de teste**:

* **Pipeline do Workflow**: 
    1. Clona tanto o repositório da Suíte de Testes quanto o da [API de Performance](https://github.com/Mysterion147/performance-test-api).
    2. Sobe um ambiente Node.js para rodar a API como um serviço auxiliar (sidecar).
    3. Executa a **Suíte de Performance k6** com thresholds (limites) pré-definidos.
    4. **Relatórios Automáticos**: A cada push na `main`, um novo relatório HTML é gerado e publicado via GitHub Pages.

#### 📊 Relatório de Performance
Você pode acessar o relatório da última execução automatizada aqui:
[**Visualizar Relatório de Performance ao Vivo 📈**](https://Mysterion147.github.io/k6-performance-suite/reports/complete-suite-report.html)

#### 🛡️ Quality Gates (Thresholds)
O build irá **falhar** se:
* O **P(95)** das requisições exceder **700ms** (Gate de Latência).
* A taxa de erro for superior a **1%** (desconsiderando o cenário proposital `/unstable`).

## ⭐ Objetivos do Projeto
* Avaliar o comportamento da API sob diferentes perfis de carga (Load, Stress, Spike, Soak).
* Detectar vazamentos de memória (memory leaks) e degradação de performance ao longo do tempo.
* Validar a resiliência e recuperação do sistema após picos repentinos de tráfego.
* Implementar limites (thresholds) automatizados para prontidão em CI/CD.
### Alvo: API simples feita com Fastify, você pode conferi-la [aqui](https://github.com/Mysterion147/performance-test-api).

## 🛠️ Tecnologias
* **Ferramenta:** k6 (Grafana)
* **Scripting:** JavaScript (ES6)
* **Relatórios:** k6-reporter (Relatórios visuais em HTML). Créditos ao [autor](https://github.com/benc-uk/k6-reporter)

## 🏗️ Estrutura da Suíte
A suíte está consolidada em um único arquivo (`complete-suite/performance-suite.js`) usando **Scenarios**, permitindo que múltiplos testes rodem isolados ou em paralelo:

1. **Load Test**: Tráfego constante para estabelecer uma linha de base (baseline).
2. **Stress Test**: Aumento gradual de carga para encontrar o ponto de ruptura do sistema.
3. **Spike Test**: Picos repentinos e massivos para testar a elasticidade imediata.
4. **Soak Test**: Testes de longa duração para identificar exaustão de recursos.
5. **Unstable & Slow Routes**: Cenários específicos para endpoints instáveis ou lentos.
6. **High Demand (POST)**: Simulação de fluxo de checkout real com dados dinâmicos e "think time" de clientes.

## 💡 Insights Técnicos
* **Thresholds Avançados**: Cada cenário possui suas próproas métricas de performance (ex: p(95) < 200ms para rotas rápidas), garantindo detecção precisa de falhas.
* **Dados Dinâmicos**: Uso de `randomIntBetween` para gerar UserIDs e ProductIDs únicos, evitando que o cache do banco de dados mascare os resultados.
* **Groups & Scenarios**: Organização modular que permite rodar toda a bateria de testes com um único comando, separando métricas por contexto.

## 🚀 Como Executar
1. Instale o k6: `brew install k6` (macOS), `winget install k6` (Windows) ou baixe em [k6.io].
2. Clone este repositório.
3. Execute a suíte completa:
   `k6 run complete-suite/performance-suite.js`
