module.exports = {
    arr: [1,2,3],
    questionOne: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Вариант №1', callback_data: '/q1_1' },{ text: 'Вариант №2', callback_data: '/q1_2' },{ text: 'Вариант №3', callback_data: '/q1_3' }],
            ]
        })
    },
    questionTwo: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Вариант №1', callback_data: '/q2_1' },{ text: 'Вариант №2', callback_data: '/q2_2' },{ text: 'Вариант №3', callback_data: '/q2_3' }],
            ]
        })
    }

}

