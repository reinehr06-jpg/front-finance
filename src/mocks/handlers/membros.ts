import { http, HttpResponse } from "msw";

const mockMembros = [
  { id: "1", nome: "Maria Santos", email: "maria@test.com", status: "ativo", ministerioId: "1" },
  { id: "2", nome: "Carlos Oliveira", email: "carlos@test.com", status: "ativo", ministerioId: "2" },
];

export const membrosHandlers = [
  http.get("/api/membros", () =>
    HttpResponse.json({ data: mockMembros, meta: { currentPage: 1, lastPage: 1, perPage: 20, total: 2 } })
  ),
  http.post("/api/membros", async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json({ id: crypto.randomUUID(), ...body }, { status: 201 });
  }),
  http.delete("/api/membros/:id", () => new HttpResponse(null, { status: 204 })),
];
