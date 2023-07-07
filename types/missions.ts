import {z} from 'zod'

export const missionSchema = z
  .object({
    id: z.string(),
    desc: z.string().min(10),
    name: z.string().min(5),
    rewards: z.string(),
    userId: z.string(),
    communityId: z.string(),
    state: z.enum(["DRAFT", "PENDING", "OPEN", "CLOSED"]),
    submissionType: z.enum([
      "URL",
      "IMAGE",
      "TEXT",
      "QUIZ",
      "VISIT",
      "EMPTY",
      "TWITTER",
      "DISCORD",
      "TELEGRAM",
      "INVITES",
    ]),
    recurrence: z.enum(["ONCE", "DAILY", "WEEKLY", "MONTHLY"]),
  })
  .partial(
    {
        id: true,
        state: true,
        submissionType: true,
        recurrence: true
    }
  );