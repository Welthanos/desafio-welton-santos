class CaixaDaLanchonete {
    pagamentos = ["dinheiro", "debito", "credito"];

    cardapio = [
        {
            codigo: "cafe",
            descricao: "Café",
            valor: 3.00
        },
        {
            codigo: "chantily",
            descricao: "Chantily (extra do Café)",
            valor: 1.50
        },
        {
            codigo: "suco",
            descricao: "Suco Natural",
            valor: 6.20
        },
        {
            codigo: "sanduiche",
            descricao: "Sanduíche",
            valor: 6.50
        },
        {
            codigo: "queijo",
            descricao: "Queijo (extra do Sanduíche)",
            valor: 2.00
        },
        {
            codigo: "salgado",
            descricao: "Salgado",
            valor: 7.25
        },
        {
            codigo: "combo1",
            descricao: "1 Suco e 1 Sanduíche",
            valor: 9.50
        },
        {
            codigo: "combo2",
            descricao: "1 Café e 1 Sanduíche",
            valor: 7.50
        }
    ];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.pagamentos.includes(metodoDePagamento)) return "Forma de pagamento inválida!";

        if (itens.length === 0) return "Não há itens no carrinho de compra!";

        const itensMapeados = itens.map(item => item.split(","));

        const itensInvalidos = () => {
            let contador = 0;
            for (let itemPedido of itensMapeados) {
                for (let itemCardapio of this.cardapio) if (itemPedido[0] === itemCardapio.codigo) contador++;
            }

            return contador < itensMapeados.length ? true : false;
        }

        for (let item of itensMapeados) if (item[1] === "0") return "Quantidade inválida!";

        if (itensInvalidos()) return "Item inválido!";

        const verificaExtra = () => {
            let cafe = itensMapeados.filter(item => item[0] === "cafe").length >= 1 ? true : false;
            let chantily = itensMapeados.filter(item => item[0] === "chantily").length >= 1 ? true : false;

            if (chantily && !cafe) return false;

            let queijo = itensMapeados.filter(item => item[0] === "queijo").length >= 1 ? true : false;
            let sanduiche = itensMapeados.filter(item => item[0] === "sanduiche").length >= 1 ? true : false;

            if (queijo && !sanduiche) return false;

            return true;
        }

        if (!verificaExtra()) return "Item extra não pode ser pedido sem o principal";

        const valor = () => {
            let total = 0;
            for (let itemCardapio of this.cardapio) {
                for (let itemCompra of itensMapeados) {

                    if (itemCardapio.codigo === itemCompra[0]) {
                        let calculo = itemCardapio.valor * parseInt(itemCompra[1]);

                        total += calculo;
                    }
                }
            }

            if (metodoDePagamento === "dinheiro") total -= (total * 0.05);

            if (metodoDePagamento === "credito") total += (total * 0.03);

            let totalFormatado = String(total.toFixed(2)).replace(".", ",");

            return `R$ ${totalFormatado}`;
        }

        return valor();
    }
}

export { CaixaDaLanchonete };
