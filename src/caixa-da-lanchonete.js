class CaixaDaLanchonete {
    metodosDePagamento = ["dinheiro", "debito", "credito"];

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

        const itensInvalidos = () => {
            let contador = 0;

            for (let itemPedido of itensMapeados) for (let itemCardapio of this.cardapio) {
                if (itemPedido[0] === itemCardapio.codigo) contador++;
            }

            return contador < itensMapeados.length ? true : false;
        }

        const itemExtraSemPrincipal = () => {
            let itens = { cafe: false, chantily: false, sanduiche: false, queijo: false };

            for (let item in itens) {
                itens[item] = itensMapeados.filter(i => i[0] === item).length >= 1 ? true : false;
            }

            if (itens.chantily && !itens.cafe) return true;
            if (itens.queijo && !itens.sanduiche) return true;

            return false;
        }

        const totalPedido = () => {
            let total = 0;

            for (let itemCardapio of this.cardapio) {
                for (let itemPedido of itensMapeados) {
                    if (itemCardapio.codigo === itemPedido[0]) {
                        total += itemCardapio.valor * parseInt(itemPedido[1]);
                    }
                }
            }

            if (metodoDePagamento === "dinheiro") total -= (total * 0.05);
            if (metodoDePagamento === "credito") total += (total * 0.03);

            let totalFormatado = `R$ ${total.toFixed(2)}`.replace(".", ",");

            return totalFormatado;
        }

        // Verifica a existência da forma de pagamento passado por parâmetro
        if (!this.metodosDePagamento.includes(metodoDePagamento)) return "Forma de pagamento inválida!";

        // Verifica a ocorrência de pedidos sem itens (itens => [])
        if (itens.length === 0) return "Não há itens no carrinho de compra!";

        // Separa o código do item de sua respectiva quantidade
        const itensMapeados = itens.map(item => item.split(","));

        // Verifica a ocorrência de itens com quantidade igual a 0 (zero)
        for (let item of itensMapeados) if (item[1] === "0") return "Quantidade inválida!";

        // Verifica a existência do item passado por parâmetro no cardápio
        if (itensInvalidos()) return "Item inválido!";

        // Verifica se o item extra está acompanhando o seu item principal
        if (itemExtraSemPrincipal()) return "Item extra não pode ser pedido sem o principal";

        // Retorna o valor total da compra
        return totalPedido();
    }
}

export { CaixaDaLanchonete };
