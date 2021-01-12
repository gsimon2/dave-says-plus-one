let isInspireCourageActive = false;
const searchTextArray = ['strike', 'attack', 'damage'];
const inspireCourageKeys = ['dance-party', 'danceparty', 'ising'];

Hooks.on('init', () => {
    game.settings.register("dave-says-plus-one", "addOne", {
        name: "Bot reminder to add 1 when inspire courage is going",
        hint: "Spams a reminder to chat when strikes, or damage rolls are made to add one",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });
});

Hooks.on('createChatMessage', (msg) => {
    if (game.settings.get('dave-says-plus-one', 'addOne')) {
        const messageUser = msg.user.data;
        const gameUser = game.user.data;

        if (msg.data.flavor
            && searchTextArray.some(text => msg.data.flavor.toLowerCase().includes(text))
            && isInspireCourageActive
        ) {
            let chatData = {
                "user": gameUser._id,
                "content": "<b>says plus one!</b>"
            }
            CONFIG.ChatMessage.entityClass.create(chatData);
        }

        if (msg.data
            && msg.data.content
            && inspireCourageKeys.some(ak => msg.data.content.toLowerCase().includes(ak))
            && messageUser._id === gameUser._id
        ) {
            isInspireCourageActive = !isInspireCourageActive;
            let chatData = {
                "user": gameUser._id,
                "content": isInspireCourageActive ? `is inspiring courage! 🎶` : 'is no longer inspiring courage 😒'
            }
            CONFIG.ChatMessage.entityClass.create(chatData);
        }
    }
});
