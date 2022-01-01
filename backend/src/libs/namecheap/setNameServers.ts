import { callNamecheapApi } from "./callNamecheapApi";

export async function setNameServers(domain: string, nameServers: string) {
  if (domain.split(".").length > 2) throw new Error("Domain validation error");
  const [SLD, TLD] = domain.toLowerCase().split(".");

  const params = {
    SLD,
    TLD,
    Command: "namecheap.domains.dns.setCustom",
    NameServers: nameServers,
  };

  return callNamecheapApi(params);
}
