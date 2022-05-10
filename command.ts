const { SlashCommandBuilder } = require("@discordjs/builders");


class Command {
    /** @type {SlashCommandBuilder} */
    builder;
    /** @type {Function} */
    callback;

    /**
     * @param {SlashCommandBuilder} builder
     * @param {Function} callback
     */
    constructor (builder, callback) {
        this.builder = builder
        this.callback = callback
    }
}