/**
 * Used for deprecating values and throwing an error if a given version of Expo has passed.
 */
export default function warnDeprecated(library: string, deprecatedAPI: string, options?: {
    replacement?: string;
    currentVersion?: string;
    versionToRemove?: string;
}): void;
