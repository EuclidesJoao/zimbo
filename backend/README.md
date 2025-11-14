src/
├── domain/
│   ├── entities/
│   │   └── Product.js
│   ├── value-objects/
│   │   └── Money.js
│   ├── repositories/
│   │   └── ProductRepository.js
│   └── services/
│       └── ProductService.js
├── infrastructure/
│   ├── database/
│   │   ├── connection.js
│   │   └── repositories/
│   │       └── ProductRepositoryPostgres.js
│   ├── http/
│   │   ├── controllers/
│   │   │   └── ProductController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── validation.js
│   │   │   └── auth.js
│   │   └── routes/
│   │       └── productRoutes.js
│   └── utils/
│       ├── logger.js
│       └── validators.js
├── application/
│   └── use-cases/
│       └── product/
│           ├── CreateProductUseCase.js
│           ├── GetProductUseCase.js
│           ├── UpdateProductUseCase.js
│           └── DeleteProductUseCase.js
├── shared/
│   ├── errors/
│   │   ├── AppError.js
│   │   ├── DomainError.js
│   │   └── InfrastructureError.js
│   └── utils/
│       ├── responseHandler.js
│       └── queryBuilder.js
└── app.js



#### /domain (Camada de demínio)

### Propósito
- Coração do negocio: Contém as regras e lógica central do sistema/aplicação
- Independente de tecnologia: Não sabe nada sobre web, banco de dados, ou frameworks
- Representa o conhecimento especialista do dominio do e-commerce

### Subpastas e suas responsabilidades


domain/entities/

- Contém os objetos principais do negócio que têm identidade única
- Exemplo: Product, ProductCategory, User, Order...
- Responsável por:
- - Validar regras de negócio internas
- - Manter consistência do estado
- - Implementar comportamento específicos do domínio


domain/value-objects/

- Objetos sem identidade única, definidos apenas por seus valores
- Exemplo: Money, Email, Adress, Price
- Caracteristicas: 
- - Imutáveis (Uma vez criados, não mudam)
- - Podem ser compartilhados entre entidades
- - Validam formatação e regras de composição


domain/repositories/

- Contratos/Interfaces que definem como acessar dados
- Não implementam a persistência real (isso fica na Infrastructure)
- Definem quais operações são possíveis no domínio


domain/services/

- Lógica de domínio que não pertence a uma entidade específica
- Coordena múltiplas entidades para executar operações complexas
- Exemplo: ProductRecommendationService, InventoryManagementService


#### /infrastructure / (Camada de Infraestrutura)

### Propósito:

- Implementa detalhes técnicos - Coneções com DB, HTTP, File Syste, etc
- Suporta a aplicação com ferramentas externas
- Pode ser substituida sem afetar o domínio

### Subpastas e responsabilidades:

infrastructure/database/

- Implentações concretas de persistência
- Adaptadores para tecnlogias específicas (PostgreSQL, MongoDB, etc)
- Responsável por:
- - Conexões com banco de dados
- - Mapeamento objeto-relaciona (ORM ou SQL puro)
- - Implentação dos repositórios definidos do Domain


infrastructure/http/

- Expõe a aplicação via API REST/GraphQL
- Lida com protocolos web - http, WebSockets, etc.
- Não contém lógica de negócio


infrastructure/http/controllers/

- Recebe request HTTP e delega para os use cases
- Transforma dados de HTTP para o formato interno
- Retorna respostas HTTP apropriadas


infrastructure/http/middleware/

- Processamento transversal - Auth, logging, validation, error handling
- Executa antes/depois dos controllers
- Não conhece o domínio da aplicação


infrastructure/http/routes/

- Define endpoints da API
- Mapeia URLs para controllers
- Configura middleware específicos por rota


infrastructure/utils/

- Ferramentas técnicas - Logging, Configurações, helpers
- Código reutilizável para aspectos técnicos


#### application/ (Camada de aplicação)

### Propósito:
- Orquestra o domínio para executar casos de uso
- Coordena entidades e serviços de domínio
- Não contém regras de negócio

### Estrutura:

application/use-cases/

- Casos de uso específicos - Cada arquivo representa uma ação do usuário
- Coordena o fluxo entre diferentes componentes do domínio
- Exemplo: "Criar Produto", "Processar Pedido", "Cancelar Compra"


#### shared/ (Compartilhado)

### Propósito:

- Código compartilhado entre todas as camadas
- Utilitários genéricos que não pertencem a nenhuma camada específica

### Subpastas:

shared/errors/

- Hierarquia de erros personalizados
- Classificação de tipos de erro (DomainError, Infrastructure


shared/utils/

- Funções utilitárias genéricas
- Helpers que podem ser usados em qualquer lugar


#### FLUXO DE UMA REQUISIÇÃO TÍPICA

CLIENTE HTTP 
    → infrastructure/http/routes/ (define rota)
    → infrastructure/http/middleware/ (valida, autentica)
    → infrastructure/http/controllers/ (recebe request)
    → application/use-cases/ (orquestra o caso de uso)
    → domain/entities/ (executa regras de negócio)
    → domain/repositories/ (interface)
    → infrastructure/database/repositories/ (implementação real com PostgreSQL)
    → domain/entities/ (retorna resultado)
    → application/use-cases/ (retorna para controller)
    → infrastructure/http/controllers/ (formata resposta HTTP)
    → CLIENTE HTTP

#### DEPENDÊNCIAS ENTRE CAMADAS

Domain ← Application ← Infrastructure
   ↑                      ↓
   └──────→ Shared ←─────┘

- Domain: Nenhuma dependência externa
- Application: Depende apenas do Domain
- Infrastructure: Depende do Domain e Application
- Shared: Independente, usado por todos


#### BENEFÍCIOS DESSA ESTRUTURA
1. Manutenibilidade - Código organizado por responsabilidade

2. Testabilidade - Cada camada pode ser testada isoladamente

3. Flexibilidade - Pode trocar banco de dados sem afetar o domínio

4. Clareza - Separação clara entre regras de negócio e detalhes técnicos

5. Escalabilidade - Time pode trabalhar em diferentes partes simultaneamente

Esta estrutura garante que o coração do seu negócio (Domain) permaneça intacto independentemente de mudanças tecnológicas!