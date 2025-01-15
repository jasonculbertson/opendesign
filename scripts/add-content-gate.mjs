import fs from 'fs/promises';
import path from 'path';

const updateFile = async (filePath) => {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    
    // Only update if it's using Layout and not already using GatedLayout
    if (content.includes('import Layout from') && !content.includes('import GatedLayout from')) {
      // Update the import
      content = content.replace(
        /import Layout from ['"](.+?)['"];/,
        (match, p1) => `import GatedLayout from '${p1.replace('Layout', 'GatedLayout')}';`
      );
      
      // Update the component usage
      content = content.replace(
        /<Layout([^>]*)>([\s\S]*?)<\/Layout>/g,
        '<GatedLayout$1>$2</GatedLayout>'
      );
      
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

const processDirectory = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.name.endsWith('.astro')) {
      await updateFile(fullPath);
    }
  }
};

// Process the leadership directory
const leadershipDir = path.join(process.cwd(), 'src/pages/docs/leadership');
processDirectory(leadershipDir);
