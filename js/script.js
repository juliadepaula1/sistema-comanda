class Pedido {
    constructor(id, produto, quantidade, status = 'Pendente') {
        this.id = id;
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

    adicionarPedido(produto, quantidade) {
        const pedido = new Pedido(this.idAtual++, produto, quantidade);
        this.pedidos.push(pedido);
        this.atualizarStorage();
        this.montarElementoProduto();
    }

    atualizarPedido(id, status) {
        const pedido = this.pedidos.find(pedido => pedido.id === id);
        if (pedido) {
            pedido.status = status;
            this.atualizarStorage();
            this.montarElementoProduto();
        }
    }

    removerPedido(id) {
        const index = this.pedidos.findIndex(pedido => pedido.id === id);
        if (index !== -1) {
            this.pedidos.splice(index, 1);
            this.atualizarStorage();
            this.montarElementoProduto(); // Atualiza a lista de pedidos
        }
    }

    atualizarStorage(){
        localStorage.setItem("@pedidos", JSON.stringify(this.pedidos));
    }

    buscarStorage() {
        const storagePedidos = localStorage.getItem("@pedidos");
        if(storagePedidos) {
            this.pedidos = JSON.parse(storagePedidos); /* O local storage precisa de arquivos em Json, ent precisa transoformar em jsonn para entrar lá, e em seguida tranformar de volta
             */
            this.montarElementoProduto();
        }
    }

    montarElementoProduto() {
        const listaPedidos = document.getElementById("lista-pedidos");
        listaPedidos.innerHTML = ""; // Limpa a lista de pedidos

        this.pedidos.forEach((pedido) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <p><strong>ID:</strong> ${pedido.id}</p>
                    <p><strong>Produto:</strong>${pedido.produto}</p>
                    <p><strong>Quantidade:</strong>${pedido.quantidade}</p>
                    <p><strong>Status:</strong>${pedido.status}</p>
                    <div class="acoes-pedidos">
                        <button class="btn-atualizar" onclick="atualizarStatus(${pedido.id}, 'Em preparo')">Em preparo</button>
                        <button class="btn-atualizar" onclick="atualizarStatus(${pedido.id}, 'Finalizado')">Em andamento</button>
                        <button class="btn-remover" onclick="removerPedido(${pedido.id})">Remover</button>
                    </div>
                `;
                listaPedidos.appendChild(li);
            });
        
    }
}

const restaurante = new Restaurante(); // Instanciando o meu objeto

function iniciarDados(){
    restaurante.buscarStorage();

    const lista = document.getElementById("lista-pedidos");
    this.montarElementoNaoExiste(lista);
}

function adicionarPedido() {
    const produto = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;

    if (produto && quantidade) {
        restaurante.adicionarPedido(produto, quantidade);
        document.getElementById("produto").value = "";
        document.getElementById("quantidade").value = ""; // Zera os campos

        atualizarMensagem();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function atualizarStatus(id, status) {
    restaurante.atualizarPedido(id, status); // Chama o método de atualização de status
}

function removerPedido(id) {
    restaurante.removerPedido(id); // Remove o pedido
    this.atualizarMensagem(); // Atualiza a mensagem se necessário

}

function atualizarMensagem() {
    const lista = document.getElementById("lista-pedidos");
    let mensagemNaoExiste = document.getElementById("nao-existe");

    if (lista.children.length === 0) {
        this.montarElementoNaoExiste(lista);
    } else {
        if (mensagemNaoExiste) {
            mensagemNaoExiste.remove(); // Remove a mensagem se houver pedidos
        }
    }
}

function montarElementoNaoExiste(lista) {
    let mensagemNaoExiste = document.getElementById("nao-existe");

    if(!mensagemNaoExiste && lista.children.length === 0) {
        const li = document.createElement("li");
        const mensagem = document.createElement("span");
        mensagem.id = "nao-existe";
        mensagem.textContent = "Não há pedidos!";
        li.appendChild(mensagem);
        lista.appendChild(li);
    }
}



this.iniciarDados();