import { defineConfig } from 'tsup'
import * as fs from 'fs-extra';
import * as path from 'path';

const copyFiles = async () => {
  const srcTypesDir = path.join(__dirname, 'src', 'types');
  const srcLocalesDir = path.join(__dirname, 'src', 'locales');
  const distDir = path.join(__dirname, 'dist');

  try {
    await fs.copy(srcTypesDir, path.join(distDir, 'types'));
    console.log('Types files copied to dist/types/');

    await fs.copy(srcLocalesDir, path.join(distDir, 'locales'));
    console.log('Locales folder copied to dist/locales/');
  } catch (err) {
    console.error('Error copying files:', err);
  }
};
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  outDir: 'dist',
  clean: true,
  onSuccess: copyFiles
});