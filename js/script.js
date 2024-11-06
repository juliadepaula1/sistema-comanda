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
        this.listaPedidos = [];
        this.idAtual = 1;
    }

    adicionarPedido(produto, quantidade){
        const pedido = new Pedido(this.idAtual++, produto, quantidade);
    }
}

