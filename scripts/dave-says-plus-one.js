let isDaveDancing = false;
const searchTextArray = ['strike', 'attack', 'damage'];
const activationKeys = ['dance-party', 'danceparty'];

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

Hooks.on('createChatMessage', (app) => {
    if (game.settings.get('dave-says-plus-one', 'addOne')) {
        if(isDaveDancing && app.data.flavor && searchTextArray.some(text => app.data.flavor.toLowerCase().includes(text))) {
            let chatData = {
                "user": game.user._id,
                "content": "<b>Dave says plus one!</b>"
            }
            CONFIG.ChatMessage.entityClass.create(chatData);
        }
    }

    if (app.data && app.data.content && activationKeys.some(ak => app.data.content.toLowerCase().includes(ak))) {
        isDaveDancing = !isDaveDancing;
        let chatData = {
            "user": game.user._id,
            "content": isDaveDancing ? 'Dance party activated!' : 'No more dance party'
        }
        CONFIG.ChatMessage.entityClass.create(chatData);
    }
});
