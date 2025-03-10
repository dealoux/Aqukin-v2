import { EmbedBuilder, GuildMember } from "discord.js";
import { client } from "..";

export function baseEmbed() {
  return new EmbedBuilder()
    .setColor(client.media.embedColour.random())
    .setFooter({
      text: "FREEDOM SMILE (^)o(^)b",
      iconURL: client.user.displayAvatarURL(),
    });
}

export function getUserName(user: GuildMember) {
  return user.displayName || user.user.username;
}

export function getUserNameMaster(user: GuildMember) {
  return `${getUserName(user)}-sama`;
}

export function formatBool(value: boolean) {
  return value ? "Yse" : "Nyo";
}

export function generateInteractionComponentId(
  authorId: string,
  componentName: string,
  args?: string | number
) {
  let result = `${authorId},${componentName}`;
  if (args != undefined) {
    result += `,${args}`;
  }

  return result;
}

/**
 * Convert the given number (in milliseconds) to hh:mm:ss format
 * @param value number (in milliseconds)
 * @returns string in hh:mm:ss format
 */
export function formatDuration(value: number) {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, value));

  // Pull out parts of interest
  let parts = [];
  if (d.getUTCHours() > 0) {
    parts.push(d.getUTCHours() + (value >= 86400000 ? d.getUTCDay() * 24 : 0));
    parts.push(d.getUTCMinutes());
  } else if (d.getUTCMinutes() >= 0) {
    parts.push(d.getUTCMinutes());
  }

  parts.push(d.getUTCSeconds() || 0);

  // Zero-pad
  return parts.map((s) => String(s).padStart(2, "0")).join(":");
}

/**
 * Convert the given string date input (hh:mm:ss) to milliseconds
 * @param value string input format hh:mm:ss
 * @returns converted number in millisecs or 0
 */
export function convertInput(value: string) {
  let total: number;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (value) {
    let token = value.trim().split(":");

    switch (token.length) {
      case 3:
        hours = Number(token[0]) * 3600;
        minutes = Number(token[1]) * 60;
        seconds = Number(token[2]);
        break;
      case 2:
        minutes = Number(token[0]) * 60;
        seconds = Number(token[1]);
        break;
      case 1:
        seconds = Number(token[0]);
        break;
    }
  }

  total = (hours + minutes + seconds) * 1000;
  total = total < 0 || isNaN(total) ? 0 : total;
  return total;
}
