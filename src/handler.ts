import { buscarCotacaoDolar } from "./service/cotacao.service.js";
import { montarMensagemCotacao } from "./service/mensagem.service.js";
import { enviarTelegram } from "./service/telegram.service.js";
import type { ScheduledEvent } from "aws-lambda";

export async function handler(_evento: ScheduledEvent): Promise<void>{

    const cotacao = await buscarCotacaoDolar();

    const mensagem = montarMensagemCotacao(cotacao);

    const enviarMensagem = await enviarTelegram(mensagem);

    console.log('Mensagem enviada com sucesso!');

}