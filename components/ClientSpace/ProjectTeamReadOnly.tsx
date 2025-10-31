'use client';

export default function ProjectTeamReadOnly({
  team,
}: {
  team: { staff_role: string; name: string | null; email: string | null }[];
}) {
  const CARD =
    'relative rounded-[2rem] p-6 md:p-8 bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';
  const CARD_INNER =
    'pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.03)]';

  return (
    <div className={CARD}>
      <div aria-hidden className={CARD_INNER} />
      <div className="relative z-10 space-y-6">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Équipe
          </div>
          <h2 className="text-xl font-semibold">Membres du projet</h2>
          <p className="text-[12px] text-muted-foreground">
            Les personnes (client + Ikovaline) associées à ce projet.
          </p>
        </div>

        {!team.length ? (
          <div className="text-sm opacity-70">Aucun membre.</div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-3">
            {team.map((m, i) => (
              <li
                key={i}
                className="rounded-[1rem] bg-black/5 dark:bg-white/10 px-4 py-3"
              >
                <div className="text-sm font-medium break-words">
                  {m.name || m.email || 'Utilisateur'}
                </div>
                <div className="text-xs opacity-70">{m.staff_role}</div>
                {m.email && (
                  <div className="text-[11px] opacity-60 break-all">
                    {m.email}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
