import Link from "next/link";
import fs from "fs";
import path from "path";

async function getCardGames() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);
  
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => ({
      name: file.replace(".md", ""),
      slug: encodeURIComponent(file.replace(".md", ""))
    }));
}

export default async function Home() {
  const cardGames = await getCardGames();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="p-8 pb-20 sm:p-20">
        <main className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Card Game Rules
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the rules and strategies for your favorite card games
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardGames.map((game, index) => (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-400/20 dark:to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-8">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-6xl">🃏</span>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                      Game #{index + 1}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {game.name}
                  </h2>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    <span className="text-sm font-medium">View Rules</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {cardGames.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No card game rules found yet.
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                Add markdown files to the /data directory to get started.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}