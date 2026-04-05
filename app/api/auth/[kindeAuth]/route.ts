// This route was used by Kinde Auth and is no longer needed.
// Auth is now handled by Clerk via middleware.ts.
// TODO: Delete the app/api/auth/[kindeAuth]/ directory.
export async function GET() {
  return new Response("Not found", { status: 404 });
}
