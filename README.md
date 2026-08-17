# 🎢 API Mock - Beto Carrero World

API agnóstica de Commerce completa para testes de agentes conversacionais, com produtos variados (passaportes e opcionais) do maior parque temático da América Latina.

## ✨ Características

- ✅ **14 produtos variados**: 6 passaportes + 8 opcionais
- ✅ **Endpoints completos**: Autenticação, catálogo, preços, carrinho, pedidos, logística
- ✅ **Dados realistas**: Preços em BRL com descontos
- ✅ **Agnóstico**: Funciona com qualquer linguagem/framework
- ✅ **CORS habilitado**: Para integração com agentes
- ✅ **Documentação**: Exemplos prontos em curl/Python/JavaScript

## 🚀 Deploy Rápido

### Railway (Recomendado)
```bash
# 1. Fork ou clone este repositório
# 2. Acesse railway.app
# 3. "New Project" → "Deploy from GitHub"
# 4. Selecione o repositório
# 5. Deploy automático em segundos!
```

### Glitch
```bash
# Acesse glitch.com → Import from GitHub
# Cole o URL do repositório
# Pronto! API rodando em https://seu-projeto.glitch.me
```

### Replit
```bash
# Acesse replit.com → Import from GitHub
# Cole o URL do repositório
# Clique "Run"
```

## 📦 Produtos Disponíveis

### Passaportes (6 tipos)
| Nome | ID | Preço | Desconto |
|------|-------|--------|----------|
| Gold Anual | `passport-gold-annual` | R$ 1.490 | 21% |
| Silver Anual | `passport-silver-annual` | R$ 890 | 10% |
| Gold 3 Dias | `passport-gold-3days` | R$ 429 | 12% |
| Silver 3 Dias | `passport-silver-3days` | R$ 249 | 14% |
| 1 Dia | `passport-1day` | R$ 149 | 17% |
| Weekend Gold | `passport-weekend-gold` | R$ 499 | 17% |

### Opcionais (8 tipos)
| Nome | ID | Preço |
|------|-------|--------|
| Sessão Fotos Profissional | `foto-profissional` | R$ 249 |
| Fast Pass (Pula Fila) | `fast-pass` | R$ 159 |
| Estacionamento | `estacionamento-diario` | R$ 34,90 |
| Voucher Alimentação | `voucher-alimentacao` | R$ 179 |
| Welcome Package VIP | `welcome-package` | R$ 74,90 |
| Tour Guiado Premium | `tour-guiado` | R$ 299 |
| Seguro Cancelamento | `seguro-cancelamento` | R$ 59,90 |
| Kit Memorabilia | `kit-memorabilia` | R$ 119,90 |

## 🔐 Autenticação

Todos os endpoints (exceto `/health`) requerem:

```
Authorization: Bearer <token_jwt>
Content-Type: application/json
X-Retailer-ID: beto-carrero-001
```

Token mockado:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvY2FycmVyb195cmV0YWlsZXIiLCJpYXQiOjE3MjQxMDAwMDB9.abc123xyz
```

Ou simplesmente use `Bearer any-token-works` para testes.

## 📚 Endpoints

### Health Check
```bash
GET /health
```

### Autenticação
```bash
POST /auth/token
```

### Produtos
```bash
GET /products/search              # Listar todos
GET /products/{productId}         # Detalhe
GET /products/search/sku/{sku}    # Buscar por SKU
GET /categories/{category}        # Por categoria
```

### Preços
```bash
GET /prices/{variantId}           # Obter preço
POST /prices/{variantId}          # Atualizar preço
```

### Carrinho
```bash
POST /carts                       # Criar carrinho
```

### Pedidos
```bash
POST /orders                      # Criar pedido
GET /orders/{orderId}             # Status
DELETE /orders/{orderId}          # Cancelar
```

### Logística
```bash
POST /freight/quote               # Cotação de frete
```

## 🧪 Exemplos de Uso

### Listar Passaportes (curl)
```bash
export API_URL="https://seu-api-url.com"
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvY2FycmVyb195cmV0YWlsZXIiLCJpYXQiOjE3MjQxMDAwMDB9.abc123xyz"

curl -X GET "${API_URL}/products/search?category=passaportes" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -H "X-Retailer-ID: beto-carrero-001"
```

### Python
```python
import requests

BASE_URL = "https://seu-api-url.com"
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvY2FycmVyb195cmV0YWlsZXIiLCJpYXQiOjE3MjQxMDAwMDB9.abc123xyz"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "X-Retailer-ID": "beto-carrero-001"
}

response = requests.get(
    f"{BASE_URL}/products/search?category=passaportes",
    headers=headers
)
print(response.json())
```

### JavaScript
```javascript
const BASE_URL = "https://seu-api-url.com";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvY2FycmVyb195cmV0YWlsZXIiLCJpYXQiOjE3MjQxMDAwMDB9.abc123xyz";

fetch(`${BASE_URL}/products/search?category=passaportes`, {
  headers: {
    "Authorization": `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    "X-Retailer-ID": "beto-carrero-001"
  }
})
  .then(r => r.json())
  .then(data => console.log(data));
```

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
npm install
```

### Rodar Localmente
```bash
npm start
# API rodará em http://localhost:3000
```

### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```

## 📋 Estrutura da Resposta

```json
{
  "products": [
    {
      "id": "passport-gold-annual",
      "name": "Passaporte Gold Anual",
      "sku": "SKU-BC-PGA-2024",
      "category": "passaportes",
      "description": "...",
      "price": {
        "currency": "BRL",
        "original_price": 1890.00,
        "sale_price": 1490.00,
        "discount_percentage": 21.16
      },
      "availability": {
        "in_stock": true,
        "quantity": 1000
      }
    }
  ],
  "pagination": {
    "from": 0,
    "size": 10,
    "total": 14,
    "pages": 2
  }
}
```

## 🎯 Integração com Agentes Conversacionais

Use esta API para testar agentes (ChatGPT, Claude, LLaMA) que precisam:

1. **Buscar produtos** → `GET /products/search`
2. **Consultar preços** → `GET /prices/{id}`
3. **Simular compras** → `POST /orders`
4. **Gerenciar carrinhos** → `POST /carts`
5. **Calcular frete** → `POST /freight/quote`

## 🔒 Segurança em Produção

⚠️ **IMPORTANTE**: Esta é uma API MOCK para testes. Para produção:

1. Implemente validação real de JWT
2. Adicione rate limiting
3. Implemente logging e monitoring
4. Valide entrada de dados
5. Use HTTPS obrigatoriamente
6. Restrinja CORS por domínio

## 📖 Documentação Completa

Veja `DEPLOY_INSTRUCOES.md` para guia completo de deployment.
Veja `EXEMPLOS_CURL.sh` para exemplos de uso.

## 📞 Suporte

Dúvidas? Consulte a documentação da API OmniChat:
https://developers.omni.chat/docs/

## 📄 Licença

MIT

---

**Deploy em Produção**: Escolha uma das plataformas recomendadas acima (Railway, Glitch, Replit) e tenha sua API online em minutos! 🚀

**Última Atualização**: Agosto 2024  
**Versão**: 1.0.0
