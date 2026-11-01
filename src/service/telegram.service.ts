

export async function enviarTelegram(mensagem: string): Promise<void>{

    const tokenChat = process.env.TELEGRAM_TOKEN;
    const idChat = process.env.TELEGRAM_CHAT_ID;

    if(!tokenChat || !idChat){
        throw new Error(`Errro ao buscar id do chat ou token do bot`);
    }

    const url = `https://api.telegram.org/bot${tokenChat}/sendMessage`

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: idChat,
            text: mensagem
        }
        )
    };

    const enviar = await fetch(url, options);

    if (!enviar.ok){
        throw new Error(`Erro ao enviar cotação: ${enviar.status}`); 
    }
}