
const produtos = [
    {
        id: 'abc123',
        nome: 'Pet da Fotudona',
        descricao: 'Tosa e banho',
        preco: '150',
        imagem: 'https://girabetim.com.br/wp-content/uploads/2019/02/gato-cachorro2.png'
    },
    {
        id: 'bbc123',
        nome: 'Pet da Fox',
        descricao: 'Corte das Unhas',
        preco: '50',
        imagem: 'https://www.petsa.com.br/source/files/c/11104/800-472-0-0.jpg'
    },
    {
        id: 'cbc123',
        nome: 'Pet da Fotuda',
        descricao: 'Limpeza dos Dentes',
        preco: '100',
        imagem: 'https://vetloscolorados.com/wp-content/uploads/2016/11/pets_big.png'
    }

];

const carrinhoItens = {

     'bbc123': {
         id: 'bbc123',
         nome: 'Pet da Fox',
         descricao: 'Corte das Unhas',
         preco: '50',
         imagem: 'https://www.petsa.com.br/source/files/c/11104/800-472-0-0.jpg',
         quantidade: 1
     },
     'cbc123': {
         id: 'cbc123',
         nome: 'Pet da Fotuda',
         descricao: 'Limpeza dos Dentes',
         preco: '100',
         imagem: 'https://vetloscolorados.com/wp-content/uploads/2016/11/pets_big.png',
         quantidade: 1
     }
};

function renderizaProduto(produto, index) {
    return `          
    <div class="col-sm-4 mb-3">
        <div class="card">
            <div class="card loja_item">
                <img class="card-img-top"
                src= ${produto.imagem} alt="">
                    <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <small>R$ ${produto.preco}</small>
                    <p class="card-text">${produto.descricao}</p>
                    <button data-index="${index}" class="btn btn-primary btn-add">Adicionar</button>
            </div>
         </div>
        </div>
  </div>
`
}

function renderizaProdutos() {
    let html = '';
    for (let i = 0; i < produtos.length; i++) {
        html = html + renderizaProduto(produtos[i], i);
    }
    return html;

}

function renderizaItemCarrinho(produtoCarrinho) {
    return `
        <div class="card carrinho_item">
            <div class="card-body">
               <h5 class="card-title">${produtoCarrinho.nome}</h5>
               <p class="card-text">Preço Unidade: R$${produtoCarrinho.preco} | Quantidade: ${produtoCarrinho.quantidade}</p>
               <p class="card-text">Valor: R$ ${produtoCarrinho.preco * produtoCarrinho.quantidade}</p>
               <button data-produto-id="${produtoCarrinho.id}" class="btn btn-danger btn-sm btn-remove">Remover</button>
             </div>
           </div>
  `
}

function renderizaCarrinho() {
    let html = '';
    for (let produtoId in carrinhoItens) {
        html = html + renderizaItemCarrinho(carrinhoItens[produtoId])
    }
    document.querySelector('.carrinho_itens').innerHTML = html;
}

function renderCarrinhoTotal() {
    let total = 0;
    for (let produtoId in carrinhoItens) {
        total = total + (carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade);

    }
    if (Object.keys(carrinhoItens).length === 0) {
        document.querySelector('.carrinho_total')
            .innerHTML = `<h6><strong>Carrinho Vazio  <i class="fas fa-cart-arrow-down"></i> </strong></h6>`

    } else {
        document.querySelector('.carrinho_total')
            .innerHTML = `<h6>Total: <strong>R$${total}</strong></h6>`

    }

}

function adicionaItemNoCarrinho(produto) {
    if (!carrinhoItens[produto.id]) {
        carrinhoItens[produto.id] = produto;
        carrinhoItens[produto.id].quantidade = 0;
    }
    ++carrinhoItens[produto.id].quantidade;

    renderizaCarrinho();
    renderCarrinhoTotal();

}

document.body
    .addEventListener('click', function (event) {
        const elemento = event.target;

        if (elemento.classList.contains('btn-add')) {
            const index = parseInt(elemento.getAttribute('data-index'), 10);
            const produto = produtos[index];

            adicionaItemNoCarrinho(produto);
        }

        if (elemento.classList.contains('btn-remove')) {
            const produtoId = elemento.getAttribute("data-produto-id");

            if (carrinhosItens[produtoId].quantidade <= 1) {
                delete carrinhoItens[produtoId];
            } else {
                --carrinhoItens[produtoId].quantidade;
            }

            renderizaCarrinho();
            renderCarrinhoTotal();
        }

    });



document.querySelector('.loja').innerHTML = renderizaProdutos();


