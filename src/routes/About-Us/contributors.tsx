import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

interface Contributor {
  login: string
  avatar_url: string
  html_url: string
  contributions?: number
}

const GITHUB_REPO = 'FlexTail/FlexTail'

export const Route = createFileRoute('/About-Us/contributors')({
  component: () => {
    const [contributors, setContributors] = useState<Contributor[]>([])
    const [topContributors, setTopContributors] = useState<Contributor[]>([])

    useEffect(() => {
      fetch(`https://api.github.com/repos/${GITHUB_REPO}/contributors`)
        .then((res) => res.json())
        .then((data: Contributor[]) => {
          const filtered = data.filter(
            (c) => !c.login.toLowerCase().includes('bot'),
          )
          const sorted = [...filtered].sort(
            (a, b) => (b.contributions ?? 0) - (a.contributions ?? 0),
          )
          setTopContributors(sorted.slice(0, 2))
          setContributors(sorted.slice(2))
        })
        .catch(() => {
          setTopContributors([])
          setContributors([])
        })
    }, [])

    return (
      <div className="min-h-screen text-black dark:text-white px-6 flex flex-col justify-center items-center text-left">
        {topContributors.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Top Contributors
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {topContributors.map((contributor) => (
                <a
                  key={contributor.login}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg hover:shadow-md transition"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <span className="text-sm font-semibold">
                    {contributor.login}
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                    {contributor.contributions} Contributions
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            All Contributors
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {contributors.map((contributor) => (
              <a
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-lg hover:shadow-md transition"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-10 h-10 rounded-full mb-2"
                />
                <span className="text-xs font-medium">{contributor.login}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    )
  },
})
