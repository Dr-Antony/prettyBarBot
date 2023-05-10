


const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config()

const text = require('./constText')

const block1 = text.text1 + text.text2 + text.text3

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => ctx.reply('Вот мы и начали'));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('questionnaire', async (ctx) => {
    try {
        await ctx.reply('Укажите наиболее подходящее описание:')
        await ctx.replyWithHTML(block1, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Вариант №1', 'btn_1')],
                [Markup.button.callback('Вариант №2', 'btn_2')],
                [Markup.button.callback('Вариант №3', 'btn_3')],
            ]))
    } catch (e) {
        console.error(e)
    }
}
)

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, { disable_web_page_preview: true })
        } catch (e) { console.error(e) }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)




bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));










// bot.command('questionnaire', async (ctx) => {
//     try {
//         ctx.replyWithHTML(text.text1, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('В ябл очко!', 'btn_1')],
//             ]
//         )),
//         ctx.replyWithHTML(text.text2, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Вот этот вариант', 'btn_2')],
//             ]
//         )),
//         ctx.replyWithHTML(text.text3, Markup.inlineKeyboard(
//             [
//                 [Markup.button.callback('Наверное это', 'btn_3')],
//             ]
//         ))
//     } catch (e) {
//         console.error(e)
//     }
// }
// )

