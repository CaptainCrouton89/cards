import fs from "fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getGameContent(slug: string) {
  const dataDir = path.join(process.cwd(), "data");
  const decodedSlug = decodeURIComponent(slug);
  const filePath = path.join(dataDir, `${decodedSlug}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const content = await getGameContent(slug);

  if (!content) {
    notFound();
  }

  const gameName = decodeURIComponent(slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="p-8 pb-20 sm:p-20">
        <main className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium mb-8 group transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all games
          </Link>

          <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">🃏</span>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {gameName}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Complete rules and instructions
                  </p>
                </div>
              </div>
            </div>

            <div className="markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => (
                    <h1 className="text-4xl font-bold mt-10 mb-6 text-gray-900 dark:text-white border-b-2 border-purple-300 dark:border-purple-700 pb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="text-3xl font-semibold mt-8 mb-4 text-purple-700 dark:text-purple-400">
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-2xl font-medium mt-6 mb-3 text-gray-800 dark:text-gray-200">
                      {children}
                    </h3>
                  ),
                  p: ({children}) => (
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                      {children}
                    </p>
                  ),
                  strong: ({children}) => (
                    <strong className="font-bold text-purple-700 dark:text-purple-400">
                      {children}
                    </strong>
                  ),
                  em: ({children}) => (
                    <em className="italic text-gray-800 dark:text-gray-200">
                      {children}
                    </em>
                  ),
                  ul: ({children}) => (
                    <ul className="list-none space-y-3 mb-6 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({children}) => (
                    <ol className="list-decimal space-y-3 mb-6 ml-6 marker:text-purple-600 dark:marker:text-purple-400">
                      {children}
                    </ol>
                  ),
                  li: ({children}) => (
                    <li className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                      <span className="text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  code: ({children, className}) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;
                    
                    if (isInline) {
                      return (
                        <code className="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded font-mono text-sm">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
                        {children}
                      </code>
                    );
                  },
                  pre: ({children}) => (
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                      {children}
                    </pre>
                  ),
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
                      {children}
                    </blockquote>
                  ),
                  hr: () => (
                    <hr className="border-gray-300 dark:border-gray-600 my-8" />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
