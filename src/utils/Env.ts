const accessEnvVariable = (key: string, defaultVal?: string): string | undefined => !process.env[key] ? defaultVal : process.env[key];

const LOTR_API_TOKEN = accessEnvVariable('LOTR_API_TOKEN', undefined);
const DISCORD_BOT_TOKEN = accessEnvVariable('DISCORD_BOT_TOKEN', undefined);
const WORDNIK_API_TOKEN = accessEnvVariable('WORDNIK_API_TOKEN', undefined);

export {
    accessEnvVariable,
    LOTR_API_TOKEN,
    DISCORD_BOT_TOKEN,
    WORDNIK_API_TOKEN
};