import { z } from 'zod'
import {createTRPCRouter, protectedProcedure } from '~/server/api/trpc'


export const userRouter = createTRPCRouter({
  createOrUpdateUser: protectedProcedure
    .input(z.object({
      lastName: z.string().optional(),
      firstName: z.string().optional(),
      email: z.string().email(),
      id: z.string()
    }))
    .mutation(async ({ctx, input}) => {
      return ctx.db.profile.upsert({
        create: {
          firstName: input.firstName ?? '',
          lastName: input.lastName ?? '',
          email: input.email,
          customerId: input.id,
          priceId: '123456789'
        },
        update: {
          firstName: input.firstName,
          lastName: input.lastName,
        },
        where: {
          customerId: input.id
        }
      })
    })
})
