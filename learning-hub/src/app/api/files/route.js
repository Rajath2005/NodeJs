import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // The learning files are located in the parent directory of this Next.js app
    const targetDir = path.resolve(process.cwd(), '..');
    
    // Read all files synchronously (fine for a local dev tool)
    const files = fs.readdirSync(targetDir);

    const fileData = files
      .filter((file) => {
        // Exclude the Next.js folder, git directory, and anything that isn't .js or .txt
        if (file === 'learning-hub' || file === '.git') return false;
        return file.endsWith('.js') || file.endsWith('.txt');
      })
      .map((file) => {
        const filePath = path.join(targetDir, file);
        const stats = fs.statSync(filePath);

        // Only process real files, not folders
        if (stats.isFile()) {
            const content = fs.readFileSync(filePath, 'utf8');
            return {
                name: file,
                content: content,
            };
        }
        return null;
      })
      .filter(Boolean); // Remove any nulls if folders sneaked in

    return Response.json(fileData);
  } catch (error) {
    console.error("Error reading Node.js files:", error);
    return Response.json({ error: 'Failed to read files' }, { status: 500 });
  }
}
