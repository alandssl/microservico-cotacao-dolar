import type { CotacaoInterface } from "../interface/cotacao.interface.js";


export async function buscarCotacaoDolar(): Promise<CotacaoInterface>{

    const url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';
    const buscarDolar = await fetch(url);

    if(!buscarDolar.ok){
        throw new Error(`Erro ao buscar cotação: ${buscarDolar.status}`); 
    }

    const resposta = await buscarDolar.json();

    const valorCompra = Number(resposta.USDBRL.bid);
    const dataCriada = resposta.USDBRL.create_date;
    const valorAlto = Number(resposta.USDBRL.high);

    return {valorCompra, dataCriada, valorAlto}

    
}


