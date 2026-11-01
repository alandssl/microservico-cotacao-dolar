import type { CotacaoInterface } from "../interface/cotacao.interface.js";


export function montarMensagemCotacao(cotacao: CotacaoInterface): string{

    const formatMoeda = cotacao.valorCompra.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

    const formatValor = cotacao.valorAlto.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

    const virarData = new Date(cotacao.dataCriada)
    
    const dataAno = virarData.getFullYear();
    const dataMes = virarData.getMonth() + 1;
    const dataDia = virarData.getDate();
    const dataHora = virarData.getHours();
    const dataMin = virarData.getMinutes();

    const minutoFormatado = String(dataMin).padStart(2,"0");
    const diaFormatado = String(dataDia).padStart(2, "0");
    const horaFormatado = String(dataHora).padStart(2, "0");
    const mesFormatado = String(dataMes).padStart(2, "0");


    const textoFinal = `Olá! Informações sobre a cotação do dólar abaixo: 
    Data: ${diaFormatado}/${mesFormatado}/${dataAno}
    Hora: ${horaFormatado}:${minutoFormatado} 
    ---------------------
    COTAÇÃO:
    Valor de compra: ${formatMoeda}
    Valor mais alto do dia: ${formatValor}
        `

    return textoFinal;
}