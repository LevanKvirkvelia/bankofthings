import { callNamecheapApi } from "./callNamecheapApi";

export async function isDomainOwner(domain: string) {
  const resp = await callNamecheapApi({
    Command: "namecheap.domains.getinfo",
    DomainName: domain,
  });
  return resp.ApiResponse.$.Status !== "ERROR";
}
