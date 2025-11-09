import { SetMetadata } from '@nestjs/common';

export interface ActivityMetadata {
  module?: {
    es: string;
    en: string;
  };
  description?: {
    es: string;
    en: string;
  };
}

export const ACTIVITY_METADATA_KEY = 'activity_metadata';

export function LogActivity(metadata: ActivityMetadata) {
  return SetMetadata(ACTIVITY_METADATA_KEY, metadata);
}
