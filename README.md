# Criando uma Loja Usando o Sanity.io
![Prévia da página - Preview of the page](./barro_cover.png)


### Confguração do Sanity CMS
  
<details>
    <summary>Instalação e Inicialização</summary>


- [ ] Verificar o Login
Verifique se você está logado no Sanity CLI executando o comando

    ```bash
    sanity login
    ```
- [ ] Instalar o Sanity CLI
Para instalar o Sanity CLI globalmente, execute o seguinte comando

    ```bash
    sudo npm install -g @sanity/cli
    ```

- [ ] Inicializar o Projeto Sanity
Crie um novo projeto Sanity executando

    ```bash
    npm create sanity@latest
    ```

- [ ] Acessar a pasta do Projeto e Iniciar o Servidor
    Entre na pasta recém-criada do projeto Sanity e abra o terminal. Em seguida, inicie o servidor executando

    ```bash
    npx sanity dev
    ```
- [ ] Acesso ao CMS:
Após iniciar o servidor, o CMS estará acessível em http://localhost:3333/.
</details>

  
<details>
    <summary>Configuração da Conexão Local com o Banco de Dados Sanity</summary>


- [ ] Criação do Arquivo de Configuração
Dentro da pasta src, crie um arquivo chamado client.js. Este arquivo será responsável por configurar a conexão com o banco de dados Sanity.

- [ ] Configuração da Conexão Sanity:
No arquivo client.js, importe o módulo sanityClient do pacote @sanity/client e exporte uma instância do cliente Sanity com as configurações apropriadas. Isso inclui o projectId e dataset, que podem ser encontrados no arquivo sanity.cli.js. Certifique-se de definir useCdn como true se desejar buscar no cache do edge e especifique a apiVersion como a data atual (YYYY-MM-DD) para segmentar a versão mais recente da API.

    ```bash
    import { sanityClient } from '@sanity/client';

    export default sanityClient({
      projectId: 'SEU_PROJECT_ID',
      dataset: 'SEU_DATASET',
      useCdn: true,
      apiVersion: 'YYYY-MM-DD',
    });
    ```
    Substitua 'SEU_PROJECT_ID' e 'SEU_DATASET' pelos valores apropriados encontrados em sanity.cli.js.

- [ ] Instalação da Dependência
Na raiz do seu projeto, instale a dependência @sanity/client executando o seguinte comando no terminal:

    ```bash
    npm install @sanity/client
    ```

</details>

<details>
    <summary>Outras dependências</summary>

- [ ] Leitura do Corpo dos Posts
Instalação da Dependência ```@sanity/block-content-to-react```:

    ```bash
    npm install @sanity/block-content-to-react
    ```
- [ ] Importação de Imagens
Instalação da Dependência ```@sanity/image-url```:

    ```bash
    npm install @sanity/image-url
    ```
</details>

<details>
    <summary>Deploy do Banco de Dados Local no Sanity Studio</summary>

- [ ] Leitura do Corpo dos Posts
Dentro da pasta do seu projeto Sanity (onde está localizado o Sanity Studio), execute o seguinte comando no terminal. Será solicitado um nome e poderá ser usado um que faça sentido pra a aplicação

    ```bash
    sanity deploy
    ```
    Esse comando inicia o processo de implantação, que sincroniza o banco de dados local com o projeto na nuvem, garantindo que quaisquer alterações feitas localmente sejam refletidas no ambiente de produção.  
    Com esta etapa, seu banco de dados local será sincronizado com o projeto na nuvem, permitindo que você faça alterações no ambiente de desenvolvimento e as publique quando estiver pronto.  

</details>

### Estado Glogal com Redux
Para gerenciar a lista de produtos favoritados e os itens adicionados ao carrinho de compras optei pelo uso do Redux. O Redux proporciona uma forma previsível de atualizar e acessar o estado da aplicação, garantindo que componentes em diferentes partes da árvore de componentes possam interagir de maneira eficiente e sem a necessidade de prop drilling.

### Dependências

- mobile-detect  Biblioteca javascript que permite identificar o dispositivo.
- Redux.