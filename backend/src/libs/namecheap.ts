import { URLSearchParams } from "url";
import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY as string;
const PROXY = process.env.PROXY as string;
const PROXY_HOSTNAME = new URL(PROXY).hostname;

const proxyAgent = HttpsProxyAgent(PROXY);

export async function setNameServers(domain: string, nameServers: string) {
  if (domain.split(".").length > 2) throw new Error("Domain validation error");
  const [SLD, TLD] = domain.toLowerCase().split(".");

  const searchParams = new URLSearchParams({
    ApiKey: NAMECHEAP_API_KEY,
    SLD,
    TLD,
    ApiUser: "InkOut",
    UserName: "InkOut",
    Command: "namecheap.domains.dns.setCustom",
    ClientIp: PROXY_HOSTNAME,
    NameServers: nameServers,
  });

  return fetch(
    `https://api.namecheap.com/xml.response?${searchParams.toString()}`,
    { agent: proxyAgent }
  ).then((r) => r.text());
}
