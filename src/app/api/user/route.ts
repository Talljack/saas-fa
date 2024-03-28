import { type NextRequest } from "next/server";
import { db } from "~/server/db";
import { z } from 'zod'

const User = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  id: z.string()
})

type User = z.infer<typeof User>

export async function POST(request: NextRequest) {
  const body = await request.json() as User
  const user = await db.profile.findUnique({
    where: {
      email: body.email,
      customerId: body.id
    }
  })
  if (user) {
    return Response.json({
      success: true,
      msg: 'User already exists'
    })
  }
  const data = await db.profile.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      customerId: body.id,
      // TODO: need to update priceId
      priceId: '123456789',
      email: body.email,
    }
  })
  return Response.json(data)
}
