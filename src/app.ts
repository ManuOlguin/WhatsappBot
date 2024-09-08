import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils, EVENTS } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import axios from 'axios'
import cron from 'node-cron'
import express from "express"
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const allow = '5491164056291'

const PORT = process.env.PORT ?? 3008
const chistes = [
    '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
    '¿Qué hace una abeja en el gimnasio? ¡Zum-ba!',
    '¿Por qué los esqueletos no pelean entre ellos? Porque no tienen agallas.',
    '¿Qué le dice una iguana a su hermana gemela? Somos iguanitas.',
    '¿Por qué los peces no van a la escuela? Porque están en el agua.',
    '¿Qué hace una computadora en el mar? ¡Navega!',
    '¿Por qué el libro de matemáticas se deprimió? Porque tenía demasiados problemas.',
    '¿Qué le dice una impresora a otra? ¿Esa hoja es tuya o es una impresión mía?',
    '¿Por qué el tomate no toma café? Porque toma jitomate.',
    '¿Qué hace una vaca con los ojos cerrados? Leche concentrada.'
  ];
  const checkSenderNumber = (ctx: any) => {
    console.log(ctx.from, "A")
    if (ctx.from === allow) {
        return true;
    } else {
        return false;
    }
};
  function getRandomMessage2(): string {
    const randomIndex = Math.floor(Math.random() * chistes.length);
    return chistes[randomIndex];
  }

const messages = [
    'banco', 'DIOS', 'Es total', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Mandá la palabra "chiste" para recibir uno muy gracioso!!', 'Amigo que', 'Pucha', 'diablos', 'Banco','Pipipipi', 'shavier maili', 'Es total y absoluto', 'Meu deus', 'banco', 'DIOS', 'Es total', 'Alguien haga algo', 'Amigo que', 'Pucha', 'diablos', 'Nononono es absoluto', 'Uebo', 'banco', 'Bacno', 'Banco', 'A', 'a', 'Pipipipi', 'a', 'Mmm', 'daaaa', 'shavier maili', 'Es total y absoluto', 'Meu deus', 'Amigo que', 'Pucha', 'diablos', 'Nononono es absoluto', 'Uebo', 'banco', 'Bacno', 'Banco', 'A', 'a', 'Pipipipi', 'a', 'Mmm', 'daaaa', 'shavier maili', 'Es total y absoluto', 'Meu deus', 'banco', 'DIOS', 'Es total', 'Alguien haga algo', 'Amigo que', 'Pucha', 'diablos', 'Nononono es absoluto', 'Uebo', 'banco', 'Bacno', 'Banco', 'A', 'a', 'Pipipipi', 'a', 'Mmm', 'daaaa', 'shavier maili', 'Es total y absoluto', 'Meu deus', 'Tengo una bomba', 'Tengo una bomba', 'Tengo una bomba', '>:(', 'Perooo PASAME LA BOTELLA, QUIERO BEBER EN NOMBRE DE ELLA', 'Perooo PASAME LA BOTELLA, QUIERO BEBER EN NOMBRE DE ELLA','Perooo PASAME LA BOTELLA, QUIERO BEBER EN NOMBRE DE ELLA','Perooo PASAME LA BOTELLA, QUIERO BEBER EN NOMBRE DE ELLA', 
  ];
  
  function getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
 
const welcomeFlow = addKeyword<Provider, Database>(EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic }) => {
            console.log("hola", ctx.body)
            if (!ctx.body.toLocaleLowerCase().includes('chiste')) {
                console.log(ctx.key.remoteJid)
                return await flowDynamic(getRandomMessage());

            }
            return await flowDynamic(getRandomMessage2());
        }
    )
    const checkFlow = addKeyword<Provider, Database>(EVENTS.WELCOME).addAction(  async (ctx, { gotoFlow, flowDynamic, state }) => {
        if (checkSenderNumber(ctx) == true) {
            const minDelay = 4000; // 4 seconds in milliseconds
            const maxDelay = 90000; // 1 minutes in milliseconds
            const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            console.log(`Delaying for ${randomDelay / 1000} seconds`);
            if (!ctx.body.toLocaleLowerCase().includes('chiste')) {
                console.log(ctx.key.remoteJid)
                setTimeout(async () => {

                return await flowDynamic(getRandomMessage());
                }, randomDelay);

            }
            else{
                return await flowDynamic(getRandomMessage2());

            }

        }
        else {
            return;
        }
      });

    const mensa = [
        'Compra gay im waiting!',
        '🦆',
        'la fuente del judasimo es nula',
        'Oca more like poca (as in its delivery service da poca consistencia!)',
        'Oca more like coca (hablo de la comun, y encima caliente)',
        'Oca more like sopa (medio mid)',
        'Oca more like mosca (porque es rima asonsante)',
        'Oca more like troska (porque seguro es una empresa de izquierda)',

      ];
      
      function getRandomMessage3(): string {
        const randomIndex = Math.floor(Math.random() * mensa.length);
        return mensa[randomIndex];
      }
const main = async () => {
    const adapterFlow = createFlow([checkFlow])
    
    const adapterProvider = createProvider(Provider)
    
    const adapterDB = new Database({ filename: 'db.json' })

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB
        })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    adapterProvider.server.post(
        '/v1/wa',
        handleCtx(async (bot, req, res) => {
            try {
                const { number, message } = req.body;
                const check = number + '@s.whatsapp.net';
                await bot.sendMessage(check, getRandomMessage3(), {});
                return res.end('Message sent');
            } catch (error) {
                console.log(error)
                return res.end(error)
            }
        })
    )

    httpServer(+PORT)
/*
 */


    

}
const postMessage = async () => {
    try {
        const response = await axios.post('http://localhost:3008/v1/wa', {
            number: 5491164056291,
            message: 'hola'
        });
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// Schedule the function to run every hour
cron.schedule('0 */2 * * *', () => {
    console.log('Running task every hour');
    postMessage();
});
main()
