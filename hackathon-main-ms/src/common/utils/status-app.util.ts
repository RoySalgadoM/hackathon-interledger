import { readFileSync } from 'fs';
import { join } from 'path';

export function getVersionApp(): string {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8')
    );
    return packageJson.version || '1.0.0';
  } catch (_error) {
    return '1.0.0';
  }
}
