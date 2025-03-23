# Página Products

Ela é responsável por exibir os produtos de uma determinada categoria.Veja como isso é feito.

1. **Obtém a categoria da URL:**  
   Ele usa o hook `useParams` do **React Router** para capturar o nome da categoria que está na URL.  
   ```jsx
   const { category } = useParams();
    ```


2. **Busca a lista de categorias:**
Ele chama o hook personalizado `useFetchCategories()`, que retorna a lista de todas as categorias disponíveis.

3. **Encontra os detalhes da categoria:**
O hook personalizado `useFetchCategoryDetails(categoryList, category)` verifica qual categoria na lista corresponde ao nome da categoria na URL e retorna seus detalhes (como id, title, etc.).

4. **Busca os produtos da categoria:**
Com o ID da categoria obtido no passo anterior, ele chama o hook `useFetchProductsByCategory(categoryDetails._id)`, que busca todos os produtos dessa categoria no banco de dados.

5. **Renderiza os produtos na tela:**
Se a categoria for encontrada, o componente <ProductLinks /> recebe os produtos dessa categoria e os exibe na tela.

### 🛠 De onde vem category?
O category vem do React Router, que define os parâmetros da URL.
Se a URL for /products/eletronicos, então category será "eletronicos".
Se a URL for /products/roupas, então category será "roupas".
### 🔗 Fluxo Resumido
1️⃣ Usuário acessa /products/eletronicos.
2️⃣ useParams() captura "eletronicos".
3️⃣ useFetchCategories() busca todas as categorias.
4️⃣ useFetchCategoryDetails() encontra os detalhes da categoria "eletronicos".
5️⃣ useFetchProductsByCategory() busca os produtos dessa categoria.
6️⃣ <ProductLinks /> exibe os produtos na tela.