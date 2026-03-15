# BUSINESS_RULES

## Regras Gerais

1. Apenas o corretor autenticado pode acessar a área /admin.
2. Apenas o corretor pode cadastrar, editar ou inativar imóveis.
3. O sistema é exclusivo para VENDA (não há aluguel).
4. Todo imóvel deve conter:
   - Título
   - Tipo do imóvel
   - Endereço completo
   - Descrição
   - Valor de venda maior que zero
5. O imóvel deve possuir pelo menos uma imagem válida.
6. O corretor pode editar o imóvel a qualquer momento sem necessidade de exclusão.
7. Exclusão deve ser lógica (soft delete) usando campo `isActive`.
8. Apenas imóveis com `isActive = true` aparecem na landing pública.
