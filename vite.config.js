export default {
    root: './',
    publicDir: 'public',
    base: '/solar-system-portfolio/', // Base URL for the project
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        target: 'esnext',
        outDir: 'docs', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
}