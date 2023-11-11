declare namespace NodeJS{
    interface ProcessEnv{
        VSCODE_DEBUG?: 'true'
        DIST_ELCTRON: string
        DIST: string
        VITE_PUBLIC:string
    }
}