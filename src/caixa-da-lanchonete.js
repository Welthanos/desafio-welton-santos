class CaixaDaLanchonete {
    pagamentos = ["dinheiro", "debito", "credito"];

    cardapio = [
        {
            codigo: "cafe",
            descricao: "Café",
            valor: 3.00,
            principal: true
        },
        {
            codigo: "chantily",
            descricao: "Chantily (extra do Café)",
            valor: 1.50,
            principal: false,
            relacao: "cafe"
        },
        {
            codigo: "suco",
            descricao: "Suco Natural",
            valor: 6.20,
            principal: true
        },
        {
            codigo: "sanduiche",
            descricao: "Sanduíche",
            valor: 6.50,
            principal: true
        },
        {
            codigo: "queijo",
            descricao: "Queijo (extra do Sanduíche)",
            valor: 2.00,
            principal: false,
            relacao: "sanduiche"
        },
        {
            codigo: "salgado",
            descricao: "Salgado",
            valor: 7.25,
            principal: true
        },
        {
            codigo: "combo1",
            descricao: "1 Suco e 1 Sanduíche",
            valor: 9.50,
            principal: false
        },
        {
            codigo: "combo2",
            descricao: "1 Café e 1 Sanduíche",
            valor: 7.50,
            principal: false
        },
    ];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.pagamentos.includes(metodoDePagamento)) return "Forma de pagamento inválida!";

        if (itens.length === 0) return "Não há itens no carrinho de compra!";

        const itensMapeados = itens.map((item) => {
            return item.split(",");
        });

        const itensInvalidos = () => {
            let contador = 0;
            for (let itemPedido of itensMapeados) {
                for (let itemCardapio of this.cardapio) if (itemPedido[0] === itemCardapio.codigo) contador++;
            }

            return contador < itensMapeados.length ? true : false;
        }

        for (let item of itensMapeados) if (item[1] === "0") return "Quantidade inválida!";

        if (itensInvalidos()) return "Item inválido!";

        return "";
    }
}

export { CaixaDaLanchonete };
