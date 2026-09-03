type Member = { name: string; role: string };
type Department = { name: string; members: readonly Member[] };

const isLead = (role: string) => /head|lead|manager/i.test(role);

/** leads first, otherwise original order */
function ordered(members: readonly Member[]) {
  return [...members].sort(
    (x, y) => Number(isLead(y.role)) - Number(isLead(x.role)),
  );
}

/**
 * Org tree: CEO at the root, then every department as its own labelled
 * sub-branch with elbow connectors down to each person.
 */
export function TeamTree({
  leader,
  departments,
}: {
  leader: { name: string; role: string };
  departments: readonly Department[];
}) {
  return (
    <div className="mt-14">
      {/* root */}
      <div className="flex flex-col items-center">
        <div className="rounded-xl border border-teal-light/40 bg-teal-light/[0.06] px-6 py-3.5 text-center">
          <p className="font-display text-[1rem] font-semibold text-mist">
            {leader.name}
          </p>
          <p className="mt-1 text-[0.66rem] uppercase tracking-[0.2em] text-teal-light/80">
            {leader.role}
          </p>
        </div>
        <span aria-hidden className="h-9 w-px bg-line-night" />
      </div>

      {/* department sub-branches */}
      <div className="grid gap-x-8 gap-y-11 border-t border-line-night pt-11 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <div key={d.name}>
            <div className="inline-flex items-baseline gap-2 rounded-md border border-line-night bg-white/[0.03] px-3 py-1.5">
              <h3 className="font-display text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-teal-light">
                {d.name}
              </h3>
              <span className="font-text text-[0.66rem] tabular-nums text-mist-faint">
                {d.members.length}
              </span>
            </div>

            <ul className="ml-3 mt-1 border-l border-line-night/70">
              {ordered(d.members).map((m) => (
                <li
                  key={m.name}
                  className="relative py-1.5 pl-4 before:absolute before:left-0 before:top-[1.15rem] before:h-px before:w-3 before:bg-line-night/70"
                >
                  <span
                    className={
                      isLead(m.role)
                        ? "text-[0.88rem] font-semibold text-mist"
                        : "text-[0.88rem] text-mist-soft"
                    }
                  >
                    {m.name}
                  </span>
                  {m.role ? (
                    <span
                      className={
                        isLead(m.role)
                          ? "ml-2 text-[0.7rem] uppercase tracking-[0.1em] text-teal-light/70"
                          : "ml-2 text-[0.74rem] text-mist-faint"
                      }
                    >
                      {m.role}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
