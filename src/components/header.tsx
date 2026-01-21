export const Header = () => {
    return (
        <header className="bg-white h-20 flex items-center shadow-sm mb-6 border-t-2 border-slate-700">
            <div className="flex items-center gap-3 ml-6">
                <svg 
                    className="w-7 h-7 text-slate-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                </svg>
                <h1 className="text-2xl font-medium text-slate-800 tracking-tight">
                    Lista de Tarefas
                </h1>
            </div>
        </header>
    )
}