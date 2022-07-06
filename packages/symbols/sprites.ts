/* eslint-disable no-console */
import dt from 'directory-tree';
import fs from 'fs-extra';
import { createSpinner } from 'nanospinner';
import path from 'path';
import colors from 'picocolors';
// @ts-expect-error
import svgstore from 'svgstore';

const generateTypes = (jsonStructure: { iconNames: string[]; iconStyles: string[] }) => `
export type SymbolNames = '${jsonStructure.iconNames.join('\' |\n\'')}';
export type IconStyles = '${jsonStructure.iconStyles.join('\' |\n\'')}';
`;

const run = () => {
  const spinner = createSpinner('Processing icons...').start();
  const directories = dt(path.join('svgs'));
  fs.ensureDirSync('dist');

  const jsonStructure: {
    svgs: Record<string, string[]>;
    iconNames: string[];
    iconStyles: string[];
  } = {
    svgs: {},
    iconNames: [],
    iconStyles: [],
  };

  const sprite = svgstore();

  directories.children?.forEach((dir) => {
    jsonStructure.svgs[dir.name] = [];
    jsonStructure.iconStyles.push(dir.name);
    dir.children?.forEach((file) => {
      const formattedName = file.name.replace(/-\d.*/gm, '').replace('.svg', '').replace(/(-solid|-outline|-duotone).*?/gm, '');
      const iconID = `${dir.name}/${formattedName}`;

      sprite.add(iconID, fs.readFileSync(file.path, 'utf8'));
      jsonStructure.svgs[dir.name].push(file.name);
      jsonStructure.iconNames.push(`${formattedName}`);
    });
  });
  fs.writeFileSync(path.join('dist', 'sprite.svg'), sprite.toString());
  fs.writeFileSync(path.join('dist', 'sprite.d.ts'), `
declare module "@wonderflow/symbols/sprite" {
  const svgUrl: string
  const svgComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>
  export default svgUrl
  export { svgComponent as ReactComponent }
}
`);
  fs.writeFileSync(path.join('dist', 'structure.json'), JSON.stringify([...new Set(jsonStructure.iconNames)], null, 2));
  fs.writeFileSync(path.join('dist', 'index.ts'), generateTypes(jsonStructure));
  console.clear();
  spinner.success({ text: colors.green('Icons and types generated'), mark: colors.green('✔') });
};

try {
  run();
  process.exit(0);
} catch (error) {
  console.error(colors.yellow('⚠️ Something went wrong:'), error);
  process.exit(1);
}
