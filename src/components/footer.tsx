export const Footer = () => {
    return (
        <footer className="bg-white h-10 flex justify-center items-center shadow-inner mt-6 border-t border-slate-300">
            <p className="text-sm text-slate-600 font-bold">
                &copy; {new Date().getFullYear()} Ariane Silva. Todos os direitos reservados.
            </p>
        </footer>
    )
}