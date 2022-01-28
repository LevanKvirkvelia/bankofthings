import { NotionAPI } from "notion-client";
import { v4 as uuidv4 } from "uuid";
import { NotionPermissions } from "./Notion";

export async function notionUpdatePermission(
  notionAPI: NotionAPI,
  {
    spaceId,
    pageId,
    permission,
    email,
  }: {
    spaceId: string;
    pageId: string;
    permission: keyof typeof NotionPermissions;
    email: string;
  }
) {
  const { userId } = await notionAPI.fetch<{ userId: string }>({
    endpoint: "createEmailUser",
    body: {
      email,
      preferredLocaleOrigin: "inferred_from_inviter",
      preferredLocale: "en-US",
    },
  });

  const transaction = await notionAPI.fetch({
    endpoint: "saveTransactions",
    body: {
      requestId: uuidv4(),
      transactions: [
        {
          id: uuidv4(),
          spaceId,
          operations: [
            {
              pointer: {
                table: "block",
                id: pageId,
                spaceId,
              },
              command: "setPermissionItem",
              path: ["permissions"],
              args: {
                role: NotionPermissions[permission],
                type: "user_permission",
                user_id: userId,
              },
            },
            {
              pointer: {
                table: "block",
                id: pageId,
                spaceId,
              },
              path: [],
              command: "update",
              args: {
                last_edited_time: new Date().setSeconds(0, 0),
              },
            },
          ],
        },
      ],
    },
  });
}
