const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Website hosting ko zinda rakhne ke liye simple web server
app.get('/', (req, res) => res.send('Bot is Running 24/7 on YOGamersSMP!'))
app.listen(3000)

const botArgs = {
    host: 'YOGamersSMP.aternos.me',
    port: 60060, // Aapka port yahan add kar diya hai
    username: 'AFK_Bot', // Bot ka naam jo server par dikhega
    version: false // Version auto-detect ho jayega
}

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs)

    bot.on('spawn', () => {
        console.log('Bot server par join ho gaya hai!')
        
        // Auto Activity: Jump aur Right Click
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
            bot.activateItem() // Right click action
        }, 15000) // Har 15 second mein
    })

    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        console.log(`${username}: ${message}`)
    })

    // Auto-Reconnect Logic: Agar server restart ho ya bot kick ho jaye
    bot.on('end', () => {
        console.log('Disconnected! 1 minute mein phir se try karenge...')
        setTimeout(createBot, 60000) 
    })

    bot.on('error', (err) => console.log('Error:', err))
}

createBot();
