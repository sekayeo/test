/*!-======[ Module Imports ]======-!*/
const fs = "fs".import();
const { downloadContentFromMessage } = "baileys".import();
const { TermaiCdn } = await (fol[0] + "cdn.termai.js").r();

/*!-======[ Default Export Function ]======-!*/
export default async function on({ cht, Exp, store, ev, is }) {
  const { id } = cht;
  const { func } = Exp;
  let infos = Data.infos;

  ev.on(
    {
      cmd: ["menu"],
      listmenu: ["menu"],
      tag: "other",
    },
    async () => {
      let hit = func.getTotalCmd();
      let topcmd = func.topCmd(2);
      let totalCmd = Object.keys(Data.events).length;
      let head = `*[ INFO ]*\n- *${hit.total}* Hit Emitter\n- *${hit.ai_response}* Ai response\n\n*[ Relationship ]*\n- Status: *${cht.memories.role}*\n- Mood: ${cht.memories.energy}${cht.memories.energy < 10 ? "😪" : "⚡"}\n\n ▪︎ 『 \`Events On\` 』\n- Total: ${totalCmd}\n\n ▪︎ 『 \`Top Cmd \`』\n> ${"`"}${topcmd.join("`\n> `")}${"`"}\n\n`;
      let text =
        head + func.menuFormatter(Data.events, { ...cfg.menu, ...cht });
      let menu = {};
      if (cfg?.menu_type == "text") {
        menu.text = text;
        await Exp.sendMessage(id, menu, { quoted: cht });
      } else if (cfg?.menu_type == "image") {
        menu.image = fs.readFileSync(fol[3] + "ouka.jpg");
        menu.caption = text;
        await Exp.sendMessage(id, menu, { quoted: cht });
      } else if (cfg?.menu_type == "video") {
        menu.video = {
          url: cfg.menu.video || "https://c.termai.cc/v86/J剗K尿fY",
        };
        menu.caption = text;
        await Exp.sendMessage(id, menu, { quoted: cht });
      } else if (cfg?.menu_type == "liveLocation") {
        await Exp.relayMessage(
          cht.id,
          {
            liveLocationMessage: {
              degreesLatitude: -76.01801,
              degreesLongitude: 22.662851,
              caption: text,
              contextInfo: {
                participant: cht.sender,
                quotedMessage: cht.message,
              },
            },
          },
          {},
        );
      } else if (cfg?.menu_type == "order") {
        await Exp.relayMessage(
          cht.id,
          {
            orderMessage: {
              orderId: "530240676665078",
              status: "INQUIRY",
              surface: "CATALOG",
              ItemCount: 0,
              message: text,
              sellerJid: "6285868755849@s.whatsapp.net",
              token: "AR6oiV5cQjZsGfjvfDwl0DXfnAE+OPRkWAQtFDaB9wxPlQ==",
              thumbnail: (await fs.readFileSync(fol[3] + "ouka.jpg")).toString(
                "base64",
              ),
            },
          },
          {},
        );
      } else if (cfg?.menu_type == "gif") {
        let video = await func.uploadToServer(
          cfg.menu.video || "https://c.termai.cc/v86/J剗K尿fY",
          "video",
        );
        await Exp.relayMessage(
          cht.id,
          {
            videoMessage: {
              ...video,
              gifPlayback: true,
              height: 520,
              width: 732,
              caption: text,
              contextInfo: {
                stanzaId: cht.key.id,
                participant: cht.sender,
                quotedMessage: cht.message,
                forwardingScore: 19,
                isForwarded: true,
                forwardedNewsletterMessageInfo: cfg.chId || {
                  newsletterJid: "120363322142730469@newsletter",
                  newslettedName: "sekayeo",
                  serverMessageId: 152,
                },
              },
            },
          },
          {},
        );
      } else if (cfg?.menu_type == "gif+linkpreview") {
        let video = await func.uploadToServer(
          cfg.menu.video || "https://c.termai.cc/v86/J剗K尿fY",
          "video",
        );
        keys["thumbnailUrl"] ||= await TermaiCdn(
          fs.readFileSync(fol[3] + "ouka.jpg"),
        );
        let { thumbnailUrl } = keys;

        await Exp.relayMessage(
          cht.id,
          {
            videoMessage: {
              ...video,
              gifPlayback: true,
              height: 520,
              width: 732,
              caption: text,
              mimetype: "video/mp4",
              contextInfo: {
                stanzaId: cht.key.id,
                participant: cht.sender,
                quotedMessage: cht.message,
               // forwardingScore: 19,
                isForwarded: true,
                externalAdReply: {
                  title: cht.pushName,
                  body: "Artificial Intelligence, The beginning of the robot era",
                  thumbnailUrl,
                  sourceUrl: "https://github.com/Sekayeo",
                  mediaUrl: `http://ẉa.me/6285868755849/${Math.floor(Math.random() * 100000000000000000)}`,
                  renderLargerThumbnail: true,
                //  showAdAttribution: true,
                  mediaType: 1,
                  sourceType: "ad",
                  /*sourceId: "1",*/
                  sourceUrl: "https://instagram.com/sekayeo",
                },
                forwardedNewsletterMessageInfo: cfg.chId || {
                  newsletterJid: "120363322142730469@newsletter",
                  newslettedName: "sekayeo",
                  serverMessageId: 152,
                },
              },
            },
          },
          {},
        );
      } else {
        menu = {
          text,
          contextInfo: {
            externalAdReply: {
              title: cht.pushName,
              body: "Artificial Intelligence, The beginning of the robot era",
              thumbnail: fs.readFileSync(fol[3] + "ouka.jpg"),
              sourceUrl: "https://github.com/Sekayeo",
              mediaUrl: `http://ẉa.me/6285868755849/${Math.floor(Math.random() * 100000000000000000)}`,
              renderLargerThumbnail: true,
              showAdAttribution: true,
              mediaType: "IMAGE",
              sourceType: "ad",
              sourceId: "1",
              sourceUrl: "https://instagram.com/sekayeo",
            },
            forwardingScore: 19,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363322142730469@newsletter",
              newslettedName: "sekayeo",
              serverMessageId: 152,
            },
          },
        };
        await Exp.sendMessage(id, menu, { quoted: cht });
      }
      Data.audio?.menu?.length > 0 &&
        Exp.sendMessage(
          cht.id,
          {
            audio: { url: Data.audio.menu.getRandom() },
            mimetype: "audio/mpeg",
          },
          { quoted: cht },
        );
    },
  );

  ev.on(
    {
      cmd: ["reaction", "menureaction", "reactionmenu"],
      listmenu: ["reactionmenu"],
      tag: "other",
    },
    () => {
      cht.reply(infos.reaction.menu);
    },
  );

  ev.on(
    {
      cmd: ["rvome", "rvo", "getviewonce", 'getvo'],
      listmenu: ["getviewonce", "rvome"],
      tag: "others",
      premium: true,
      isAdmin: true,
      isMention: true,
      energy: 25,
    },
    async () => {
      try {
        let isV1 = ["image", "audio", "video", "viewOnce"].includes(
          cht.quoted.type,
        );
        let ab = isV1
          ? [
              {
                message: cht.quoted,
                key: {
                  remoteJid: cht.id,
                  fromMe: cht.quoted.sender == cht.id,
                  id: cht.quoted.stanzaId,
                  participant: cht.quoted.sender,
                },
              },
            ]
          : store.messages[id].array.filter(
              (a) =>
                a.key.participant.includes(cht.mention[0]) &&
                (a.message?.viewOnceMessageV2 ||
                  a.message?.viewOnceMessageV2Extension),
            );
        if (ab.length == 0) return cht.reply(infos.others.noDetectViewOnce);
        for (let aa of ab) {
          let thay = {
            msg:
              aa.message.viewOnceMessageV2?.message?.imageMessage ||
              aa.message.viewOnceMessageV2?.message?.videoMessage ||
              aa.message.viewOnceMessageV2Extension?.message?.audioMessage,
            type: isV1
              ? cht.quoted.type
              : aa.message.viewOnceMessageV2?.message?.imageMessage
                ? "image"
                : aa.message.viewOnceMessageV2?.message?.videoMessage
                  ? "video"
                  : "audio",
          };
          let buffer;
          if (isV1) {
            buffer = await cht.quoted.download();
          } else {
            let stream = await downloadContentFromMessage(thay.msg, thay.type);
            buffer = Buffer.from([]);
            for await (const chunk of stream) {
              buffer = Buffer.concat([buffer, chunk]);
            }
          }
          let mssg = {};
          if (cht.quoted.text) mssg.caption = cht.quoted.text || undefined;
          thay.type == "audio" && (mssg.ptt = true);
          await Exp.sendMessage(
            cht.cmd == "rvome" ? cht.sender : id,
            { [thay.type]: buffer, ...mssg },
            { quoted: aa },
          );
        }
      } catch (e) {
        console.error(e);
        cht.reply(infos.others.noDetectViewOnce);
      }
    },
  );

  ev.on(
    {
      cmd: ["d", "del", "delete"],
      listmenu: ["delete"],
      tag: "other",
      isQuoted: true,
    },
    async () => {
      try {
        if (cht.quoted.sender !== Exp.number && !is.groupAdmins && !is.owner)
          return cht.reply(infos.messages.isAdmin);
        if (!is.groupAdmins && !is.owner) {
          let qsender = (await store.loadMessage(cht.id, cht.quoted.stanzaId))
            ?.message?.extendedTextMessage?.contextInfo.quotedMessage?.sender;
          if (qsender && qsender !== cht.sender)
            return cht.reply(`*Anda tidak diizinkan menghapus pesan itu!*
\`Sebab:\`
${infos.others.readMore}
- Quoted pesan tersebut bukan berasal dari anda
- Anda bukan owner atau admin untuk mendapatkan izin khusus`);
        }
        cht.quoted.delete();
      } catch {
        cht.reply(infos.messages.failed);
      }
    },
  );

  ev.on(
    {
      cmd: ["statistic", "stats"],
      listmenu: ["stats"],
      tag: "other",
    },
    async () => {
      const { cpuUsage, memoryUsage, processStats } =
        await func.getSystemStats();
      const runtimeText = processStats.runtime;

      const txt =
        cpuUsage
          .map(
            (cpu) =>
              `💻 *CPU ${cpu.cpu + 1}*\n` +
              `   Model: ${cpu.model}\n` +
              `   Usage: ${cpu.usage}\n`,
          )
          .join("\n") +
        `🧠 *Memory Usage*\n` +
        `   Total: ${memoryUsage.totalMemory}\n` +
        `   Free: ${memoryUsage.freeMemory}\n` +
        `   Used: ${memoryUsage.usedMemory}\n` +
        `📊 *Process Memory Usage*\n` +
        `   RSS: ${processStats.memoryUsage.rss}\n` +
        `   Heap Total: ${processStats.memoryUsage.heapTotal}\n` +
        `   Heap Used: ${processStats.memoryUsage.heapUsed}\n` +
        `   External: ${processStats.memoryUsage.external}\n` +
        `🚀 *Speed*: ${processStats.speed}\n` +
        `🕒 *Runtime*\n` +
        `   ${runtimeText.days}d ${runtimeText.hours}h ${runtimeText.minutes}m ${runtimeText.seconds}s ${runtimeText.milliseconds}ms\n` +
        `🔧 *Process Info*\n` +
        `   PID: ${processStats.pid}\n` +
        `   Title: ${processStats.title}\n` +
        `   Exec Path: ${processStats.execPath}`;
      return cht.reply(txt);
    },
  );
}
