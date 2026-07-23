# Portal TSS – Fukui

Portal destinado aos funcionários da **TS Service Co., Ltd. – Fukui**, desenvolvido para centralizar o acesso a formulários, orientações e informações de contato.

## Acessar o portal

🌐 **Portal TSS:**  
https://tsservice-fukui.github.io/portal-funcionarios/

## Funcionalidades

O Portal TSS oferece acesso aos seguintes serviços:

- Atualização do Cadastro Veicular;
- Atualização de Documentos;
- Solicitação de Folga Remunerada;
- Mudança de Endereço;
- Solicitação de Atestado de Trabalho（在職証明書）;
- Informações de contato da unidade de Fukui.

Alguns serviços possuem páginas com instruções que devem ser lidas antes da abertura do respectivo formulário.

## Idiomas

O portal está disponível em:

- Português;
- Japonês.

A troca de idioma é controlada pelo JavaScript. A preferência selecionada fica armazenada localmente no navegador do usuário.

## Instalação

O Portal TSS funciona como uma **Progressive Web App (PWA)** e pode ser adicionado à tela inicial do celular.

### Android

A instalação pode ser realizada pelo botão apresentado no próprio portal ou pela opção disponibilizada pelo navegador.

### iPhone

A instalação deve ser realizada pelo Safari:

1. Abra o Portal TSS no Safari;
2. Toque no botão de opções (`…`);
3. Toque em **Compartilhar**;
4. Role a lista de opções para baixo;
5. Selecione **Adicionar à Tela de Início**;
6. Confirme tocando em **Adicionar**.

Após a instalação, o portal aparecerá na tela inicial com seu próprio ícone.

## Tecnologias utilizadas

O projeto foi desenvolvido com:

- HTML5;
- CSS3;
- JavaScript;
- Progressive Web App (PWA);
- Service Worker;
- Web App Manifest;
- Google Forms;
- Git e GitHub;
- GitHub Pages.

Não são utilizados frameworks ou bibliotecas externas para a interface do portal.

## Estrutura do projeto

```text
portal-funcionarios/
├── assets/
│   ├── icons/
│   └── images/
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── pages/
├── index.html
├── manifest.webmanifest
├── service-worker.js
└── README.md
```

### Arquivos e diretórios principais

| Caminho | Finalidade |
|---|---|
| `index.html` | Página principal do portal |
| `pages/` | Páginas internas e explicativas |
| `css/styles.css` | Estilos visuais e responsividade |
| `js/app.js` | Idiomas, instalação e interações |
| `assets/images/` | Logotipos e imagens utilizadas |
| `assets/icons/` | Ícones do portal e da PWA |
| `manifest.webmanifest` | Configuração de instalação |
| `service-worker.js` | Cache e funcionamento da PWA |

## Executar localmente

Abra o PowerShell dentro da pasta do projeto e execute:

```powershell
python -m http.server 5500
```

Depois, abra o endereço abaixo no navegador:

```text
http://localhost:5500/
```

Para encerrar o servidor, retorne ao terminal e pressione:

```text
Ctrl + C
```

> O portal deve ser testado por meio de um servidor local. Não é recomendado abrir diretamente o arquivo `index.html`, pois alguns recursos da PWA precisam do servidor para funcionar corretamente.

## Publicar atualizações

Antes de publicar qualquer alteração:

1. Salve os arquivos;
2. Execute o portal localmente;
3. Teste as páginas em português e japonês;
4. Verifique os links dos formulários;
5. Confira a visualização em computador e celular.

Depois dos testes, execute:

```powershell
git status
git add .
git commit -m "Descrição da atualização"
git push
```

O GitHub Pages publicará automaticamente a nova versão.

## Service Worker e cache

O portal utiliza um Service Worker para armazenar arquivos importantes e oferecer recursos de PWA.

Quando arquivos do site forem alterados, a versão do cache em `service-worker.js` deverá ser aumentada.

Exemplo:

```javascript
const CACHE_NAME = "portal-tss-v12";
```

Antes de fazer a alteração, confira a versão atual e utilize um número superior. Isso ajuda os navegadores e aplicativos instalados a receberem os arquivos atualizados.

## Segurança e privacidade

Este repositório é público. Portanto, ele não deve armazenar:

- Dados pessoais de funcionários;
- Documentos enviados pelos formulários;
- Respostas dos Google Forms;
- Planilhas com informações de funcionários;
- Senhas, tokens ou credenciais;
- Links administrativos ou de edição dos formulários;
- Informações corporativas confidenciais.

Os documentos e as solicitações recebidas devem ser tratados exclusivamente nas ferramentas corporativas autorizadas.

## Administração

Os procedimentos completos de manutenção, publicação, testes e recuperação de versões estão registrados no:

**Manual Interno de Administração do Portal TSS – Português/Japonês**

O manual deve permanecer armazenado na pasta corporativa autorizada e ser atualizado quando houver alguma mudança relevante no portal.

## Direitos autorais

All rights reserved ©2026 TSサービス Co., Ltd.