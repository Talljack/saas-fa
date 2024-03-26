import "server-only";

import { getAuth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import { cache } from "react";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache((req?: NextRequest) => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  const auth = getAuth(req!);

  return createTRPCContext({
    headers: heads,
    auth
  });
});

export const api = createCaller(createContext);
