

import Anthropic from '@anthropic-ai/sdk';

import pkg from 'whatsapp-web.js';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});
const { Client, LocalAuth, MessageMedia } = pkg;

export const name = 'claude';
export const args = true;
export const aliases: string[] = ['laude', 'cld'];
export const description = 'Chat with Claude 3.0 sonnet';
export const category = 'AI';
/**
 * @memberof! module:AI
 * @name claude
 * @description
 * Enables chatting with Anthropic's Claude 3.0 Sonnet model within WhatsApp.
 * 
 * **Usage:**
 * - `!claude {message}` - Sends the message to Claude and replies with its response. 
 *
 * **Notes:** 
 * - This command requires an API key for Anthropic. 
 * - The maximum message length is limited to 2000 characters to avoid excessive API usage. 
 */
export async function run(
	client: pkg.Client,
	msg: pkg.Message,
	args: string[]
) {
	if (args.length == 0) {
		return;
	}

	if (args.join(' ').length >= 2000) {
		return msg.reply('ur wasting money shutup');
	}

	const res = await anthropic.messages.create({
		model: 'claude-3-sonnet-20240229',
		max_tokens: 1024,
		messages: [{ role: 'user', content: args.join(' ') }],
	});
	await msg.reply(res.content[0].text);
}
