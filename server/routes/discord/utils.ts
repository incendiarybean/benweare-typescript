import { createReadStream } from "fs";
import { join } from "path";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CacheType,
    ChatInputCommandInteraction,
    Client,
    GatewayIntentBits,
    Guild,
} from "discord.js";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { createAudioPlayer, joinVoiceChannel } from "@discordjs/voice";
import {
    AudioPlayerStatus,
    VoiceConnectionStatus,
    createAudioResource,
} from "@discordjs/voice";
import { DiscordUsernameOptions } from "@lib/types";
import { die } from "@resources/data/discord";

/*--------------*/
/*    CONFIG    */
/*--------------*/

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

/*--------------*/
/*    EVENTS    */
/*--------------*/

const commands = [
    new SlashCommandBuilder()
        .setName("assist")
        .setDescription("You following to assist?"),
    new SlashCommandBuilder()
        .setName("cry")
        .setDescription("Gonna cry?")
        .addUserOption((option) =>
            option.setName("username").setDescription("who?").setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Roll a dice!")
        .addStringOption((option) =>
            option
                .setName("faces")
                .setDescription("The number of Die faces")
                .setRequired(true)
                .addChoices(
                    { name: "6", value: "6" },
                    { name: "9", value: "9" }
                )
        ),
    new SlashCommandBuilder().setName("rpg").setDescription("Oh no..."),
];

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_ENABLED } = process.env;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN as string);

if (DISCORD_ENABLED) {
    rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID as string), {
        body: commands,
    })
        .then(() => {
            console.log(`[${new Date()}] Discord Bot commands loaded!`);
        })
        .catch((e) => {
            console.log(`[${new Date()}] ERROR: ${e.message}`);
        });
}

/*--------------*/
/* INTERACTIONS */
/*--------------*/

export const checkVoiceTarget = (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    if (!interaction.guild) {
        throw new Error("Play only works while in a guild!");
    }

    const targetUser = interaction.guild.members.cache.get(interaction.user.id);
    if (!targetUser) {
        throw new Error("Couldn't find you in the server?");
    }

    const targetVoiceChannel = targetUser.voice.channelId;
    if (!targetVoiceChannel) {
        throw new Error("Please join a voice channel!");
    }

    return { targetUser, targetVoiceChannel, guild: interaction.guild };
};

export const createPlayer = (guild: Guild, targetVoiceChannel: string) => {
    const player = createAudioPlayer();
    const connection = joinVoiceChannel({
        channelId: targetVoiceChannel as string,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
    });

    connection.subscribe(player);

    return { connection, player };
};

export const assist = async (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    await interaction.reply("https://www.youtube.com/watch?v=CRzfZu0GH14");
};

export const cry = async (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    const message = interaction.options.data[0] as DiscordUsernameOptions;
    if (message && message.user) {
        interaction.reply({
            content: `${message.user}`,
            embeds: [
                {
                    image: {
                        url: "https://media3.giphy.com/media/8JZxZgr39TLczSJQoS/giphy.gif",
                    },
                },
            ],
            allowedMentions: { parse: ["everyone"] },
        });
    }
};

export const roll = async (
    interaction: ChatInputCommandInteraction<CacheType>
) => {
    const faceCount = interaction.options.data[0].value
        ? parseInt(interaction.options.data[0].value as string)
        : 6;

    const dieArray = die.slice(0, faceCount);
    const randomFace = Math.floor(Math.random() * faceCount);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId("ClearDiceRoll")
            .setLabel("Done!")
            .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
        content: dieArray[randomFace],
        components: [row],
    });
};

export const rpg = (interaction: ChatInputCommandInteraction<CacheType>) => {
    try {
        const { targetVoiceChannel, guild } = checkVoiceTarget(interaction);

        const { connection, player } = createPlayer(guild, targetVoiceChannel);

        connection.on(VoiceConnectionStatus.Ready, () => {
            const resource = createAudioResource(
                createReadStream(
                    join(__dirname, "../../resources/audio/rpg.mp3")
                )
            );

            resource.volume?.setVolume(1);

            player.play(resource);
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
                interaction.deleteReply();
            });
        });
    } catch (e: any) {
        return interaction.reply({ content: e.message, ephemeral: true });
    }
    return interaction.reply({ content: "BOOM!" });
};
