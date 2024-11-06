class Pedido {
    constructor(id, produto, quantidade, status ='Pendente'){
        this.id = id
        this.produto = produto;
        this.quantidade = quantidade;
        this.status = status;
    }
}

class Restaurante {
    constructor() {
        this.pedidos = [];
        this.idAtual = 1;
    }

    adicionarPedido(produto, quantidade){
        const pedido = new Pedido(this.idAtual++, produto, quantidade);
    this.pedidos.push(pedido);
    this.montarElementoProduto();
    }

    montarElementoProduto(){
        const listaPedidos = document.getElementById("lista-pedidos");
    }
}

