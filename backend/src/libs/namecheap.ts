import { URLSearchParams } from "url";
import fetch from "node-fetch";

const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY as string;

export const getMyIP = async function () {
  const resp = await fetch("https://api.myip.com").then((r) => r.text());
  console.log({ resp });
  const { ip } = JSON.parse(resp);
  return ip;
};

export async function setNameServers(domain: string, nameServers: string) {
  if (domain.split(".").length > 2) throw new Error("Domain validation error");
  const [SLD, TLD] = domain.toLowerCase().split(".");

  const clientIp = await getMyIP();

  const searchParams = new URLSearchParams({
    ApiKey: NAMECHEAP_API_KEY,
    SLD,
    TLD,
    ApiUser: "InkOut",
    UserName: "InkOut",
    Command: "namecheap.domains.dns.setCustom",
    ClientIp: clientIp,
    NameServers: nameServers,
  });

  return fetch(
    `https://api.namecheap.com/xml.response?${searchParams.toString()}`
  ).then((r) => r.text());
}
