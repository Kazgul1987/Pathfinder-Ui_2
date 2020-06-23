Hooks.on('init', () => {
    // Register module settings.
	game.settings.register('chat-colors-and-more', 'icBgColor', {
		name: 'IC Background Color',
		default: "#D3E5F5",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'icTextColor', {
		name: 'IC Text Color',
		default: "#000000",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'emoteBgColor', {
		name: 'Emote Background Color',
		default: "#D1F5D1",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'emoteTextColor', {
		name: 'Emote Text Color',
		default: "#000000",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'rollBgColor', {
		name: 'Roll Background Color',
		default: "#E6BB81",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'rollTextColor', {
		name: 'Roll Text Color',
		default: "#000000",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'otherBgColor', {
		name: 'Other Background Color',
		default: "#DBD9CD",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'otherTextColor', {
		name: 'Other Text Color',
		default: "#000000",
		type: String,
		scope: 'client',
		config: true,
		hint: 'Enter a hexadecimal color (such as #FFFFFF).'
	});
	game.settings.register('chat-colors-and-more', 'defaultChatPrefix', {
		name: 'Default Chat Prefix',
		default: "",
		type: String,
		scope: 'client',
		config: true,
		hint: 'If specified, this string will be prefixed to all chat messages that are not already commands (such as /emote.)'
	});
});

Hooks.on("renderChatLog", (log, html) => {
    // Prepend inline CSS to the chatlog to style the chat messages.
    icBgColor = game.settings.get('chat-colors-and-more', 'icBgColor');
    icTextColor = game.settings.get('chat-colors-and-more', 'icTextColor');
    emoteBgColor = game.settings.get('chat-colors-and-more', 'emoteBgColor');
    emoteTextColor = game.settings.get('chat-colors-and-more', 'emoteTextColor');
    rollBgColor = game.settings.get('chat-colors-and-more', 'rollBgColor');
    rollTextColor = game.settings.get('chat-colors-and-more', 'rollTextColor');
    otherBgColor = game.settings.get('chat-colors-and-more', 'otherBgColor');
    otherTextColor = game.settings.get('chat-colors-and-more', 'otherTextColor');
    $("<style type='text/css'> #chat-log .message.ic { background: " + icBgColor+ "; color: " + icTextColor + 
    " }\n #chat-log .message.ic .message-header { color: " + icTextColor + 
    " }\n #chat-log .message.emote { background: " + emoteBgColor +
    "; color: " + emoteTextColor + 
    " }\n #chat-log .message.emote .message-header { color: " + emoteTextColor + 
    " }\n #chat-log .message.chatColorsRoll { background: " + rollBgColor + 
    "; color: " + rollTextColor + 
    " }\n #chat-log .message.chatColorsRoll .message-header { color: " + rollTextColor + 
    " }\n #chat-log .message { background: " + otherBgColor +
    "; color: " + otherTextColor + 
    " }\n #chat-log .message .message-header { color: " + otherTextColor + 
    "; } </style>").prependTo(html);
});

Hooks.on("chatMessage", (chatLog, message, chatData) => {
    if (game.settings.get('chat-colors-and-more', 'defaultChatPrefix')) {
        prefix = game.settings.get('chat-colors-and-more', 'defaultChatPrefix');
        
        // Check if the message begins with any command.
        let [command, match] = chatLog.constructor.parse(message);
        
        if ( command === "none" ) {
            // If there is no command, insert the prefix and reprocess.
            chatLog.processMessage(prefix + " " + message);
            return false;
        }
        
        // Otherwise do nothing.
        return true;
    }
});

Hooks.on("renderChatMessage", (message, html, data) => {
    // Add extra CSS classes to rolls so we can style them.
    if (message.isRoll) {
        html.addClass("chatColorsRoll");
    }
});