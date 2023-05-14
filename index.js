const TelegramBot = require('node-telegram-bot-api')



const { questions, questionTwo, endTest } = require('./textOfQuestions')
const {token} = require('./token')





const bot = new TelegramBot(token, { polling: true })






let userAnamnesis = null;
const chats = {};


let globalCount = null;


const questionsGenerator = (chatId, quest) => {
    try {
        let questionCount = globalCount;
        let q = quest[questionCount].map((element) => {
            return element
        });
        let buttons = quest[questionCount].map((element, index) => {
            variantCount = index + 1;
            return (
                { text: `Вариант ${variantCount}`, callback_data: `/q${questionCount + 1}_${variantCount}` }
            )
        })
        console.log(buttons)
        bot.sendMessage(chatId,
            `${q}`, questionTwo(buttons))
    } catch (e) { console.error(e) }
}



let aboutUs = ` это описание нашей компании, оно может быть очень длинным, или очень коротким, мы пока не определились:) `
const idBozhena = 606953393;



let endOfTest = (chatId) => {
    return (
        bot.sendMessage(chatId, `Спасибо за уделённое вами время. Ваши ответы на вопросы очень помогут нам в подборе индивидуального лечения для вас.`,
            endTest
        )
    )
}





const start = () => {

    bot.setMyCommands([
        { command: '/start', description: 'Запустить бота' },
        { command: '/about', description: 'Что умеет этот бот' },
        { command: '/anamnesis', description: 'Заполнить консультационную информацию' }
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg);
        if (text === '/start') {
            console.log(userAnamnesis)
            return bot.sendPhoto(chatId, 'https://cdn.pixabay.com/photo/2020/05/26/12/56/image-5222934_960_720.jpg')
        }
        if (text === '/about') {
            return bot.sendMessage(chatId, `Привет ${msg.chat.first_name}, ${aboutUs}`)
        }
        if (text === '/anamnesis') {
            userAnamnesis = [];
            globalCount = 0;
            userAnamnesis.push([msg.chat.username])
            return questionsGenerator(chatId, questions)
        }
        return bot.sendMessage(chatId, `You sent me ${text}`)
    });






    bot.on('callback_query', async msg => {
        try {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            const userName = msg.from.username;
            if (data === `/q${globalCount + 1}_1`) {
                userAnamnesis.push([`Вопрос №${globalCount + 1}`, `Ответ: 1`])
                globalCount++;
                if (globalCount < questions.length) {
                    return questionsGenerator(chatId, questions)
                } else {
                    endOfTest(chatId)
                }
            }
            if (data === `/q${globalCount + 1}_2`) {
                userAnamnesis.push([`Вопрос №${globalCount + 1}`, `Ответ: 2`])
                globalCount++;
                if (globalCount < questions.length) {
                    return questionsGenerator(chatId, questions)
                } else {
                    endOfTest(chatId)
                }
            }
            if (data === `/q${globalCount + 1}_3`) {
                userAnamnesis.push([`Вопрос №${globalCount + 1}`, `Ответ: 3`])
                globalCount++;
                if (globalCount < questions.length) {
                    return questionsGenerator(chatId, questions)
                } else {
                    endOfTest(chatId)
                }
            }
            if (data === '/endTest') {
                bot.sendMessage(chatId, `Данные успешно отправлены,дождитесь пока Божена свяжется с вами.`)
                bot.sendMessage(idBozhena, `${userAnamnesis}`)
            }
            if (data === '/cancel') {
                bot.sendMessage(chatId, `Нам очень жаль что вы передумали.`);
                userAnamnesis = null;
            }
            if (data === '/repeat') {
                await bot.sendMessage(chatId, `Давайте попробуем ещё раз.`)
                userAnamnesis = [];
                globalCount = 0;
                userAnamnesis.push([userName])
                await questionsGenerator(chatId, questions)
            }
        } catch (e) {
            console.error(e)
        }
    })
}

start()
