import fs from "fs";
import path from "path";
import LearningHub from "./LearningHub";

// This is a Server Component — runs at BUILD TIME on Vercel.
// It reads the .js and .txt files from the repo and passes them as props.
export default function Home() {
  const targetDir = path.resolve(process.cwd(), "..");

  let fileData = [];

  try {
    const allFiles = fs.readdirSync(targetDir);

    fileData = allFiles
      .filter((file) => {
        if (file === "learning-hub" || file === ".git" || file === "node_modules") return false;
        return file.endsWith(".js") || file.endsWith(".txt");
      })
      .map((file) => {
        const filePath = path.join(targetDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          return {
            name: file,
            content: fs.readFileSync(filePath, "utf8"),
          };
        }
        return null;
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Error reading learning files:", err);
  }

  return <LearningHub files={fileData} />;
}
